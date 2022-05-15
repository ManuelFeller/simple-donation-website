<?php

/**
 * Class to define timestamp notes
 */
class Notes {
  public $lastRead = '';
  public $lastDataUpdate = '';
}

/**
 * Class with the main buffer script
 */
class DataBuffer {
  private $remoteCsvDataSource;
  private $localNotesFile;
  private $localBufferFile;
  private $remoteCheckInterval;

  /**
   * Create a new instance of the DataBuffer
   */
  function __construct(
      $remoteCsvDataSource,
      $localNotesFile,
      $localBufferFile,
      $remoteCheckInterval
    ) {
    $this->remoteCsvDataSource = $remoteCsvDataSource;
    $this->localNotesFile = $localNotesFile;
    $this->localBufferFile = $localBufferFile;
    $this->remoteCheckInterval = $remoteCheckInterval;
  }

  /**
   * Function to get the latest CSV data from local buffer
   */
  public function getCsvData() {
    // this is a small wrapper that runs server-side to reduce the Google API calls
    $notes = new Notes();
    $dataToServe = '';
    try {
      if (file_exists($this->localNotesFile) && file_exists($this->localBufferFile)) {
        // we have a local buffer on the server side
        $notes = json_decode(file_get_contents($this->localNotesFile));
        if (($notes->lastRead + $this->remoteCheckInterval) < time()) {
          // wait time is over - we need to check remote
          $tmpLocalData = file_get_contents($this->localBufferFile);
          $tempNewData = file_get_contents($this->remoteCsvDataSource);
          if ($tempNewData === null) {
            // in case we do not get anything from remote server: use local data
            $dataToServe = $tmpLocalData;
            // remember check and persist the timestamp
            $this->updateLastRemoteCheckTimestamp($notes);
          } else {
            $lastDataUpdate = $this->extractDataUpdateTime($tempNewData);
            if ($lastDataUpdate > $notes->lastDataUpdate) {
              // use newer data and buffer it
              $dataToServe = $tmpLocalData;
              $this->updateLocalDataBufferData($dataToServe);
            } else {
              // make sure buffered data is written to output
              $dataToServe = $tmpLocalData;
              // local buffer data is still valid, so update check timestamp
              $this->updateLastRemoteCheckTimestamp($notes);
            }
          }
        } else {
          // wait time is not yet over - load local buffer
          $dataToServe = file_get_contents($this->localBufferFile);
        }
      } else {
        // at least one buffer file is missing, so restart the process
        $dataToServe = file_get_contents($this->remoteCsvDataSource);
        if ($dataToServe === null) {
          die(''); // exit with empty string
        }
        $this->updateLocalDataBufferData($dataToServe);
      }
      return $dataToServe;
    } catch (Exception $ex) {
      // var_dump($ex);
      die(''); // exit without any content
    }
  }

  /**
   * Function to update the locally persisted data buffer and the timestamps
   */
  private function updateLocalDataBufferData($csvData) {
    $notes = new Notes();
    $lastDataUpdate = $this->extractDataUpdateTime($dataToServe);
    $notes->lastRead = time();
    $notes->lastDataUpdate = $lastDataUpdate;
    // write timestamps
    $this->writeFileContent($this->localNotesFile, json_encode($notes));
    // write buffer-data
    $this->writeFileContent($this->localBufferFile, $dataToServe);
  }
  
  /**
   * Function to update the persisted date of the last remote data check
   */
  private function updateLastRemoteCheckTimestamp($notes) {
    // local buffer data is still valid, so update timestamp
    $notes->lastRead = time();
    // write timestamps
    $this->writeFileContent($this->localNotesFile, json_encode($notes));
  }
  
  /**
   * Function to extract the last update time from the CSV data
   * $csvString The csv data received from the remote server
   */
  private function extractDataUpdateTime($csvString) {
    $dataArray = array_map('str_getcsv', explode("\n", $csvString));
    $timestampIndex = array_search('lastchange', $dataArray[0]);
    return strtotime($dataArray[1][$timestampIndex]);
  }
  
  /**
   * Function to write a string into a file
   * $fileName The name (incl. path) for the file to write
   * $fileContent The content that should be written into the file
   */
  private function writeFileContent($fileName, $fileContent) {
    $writeFileHandle = fopen($fileName, "w");
    fwrite($writeFileHandle, $fileContent);
    fclose($writeFileHandle);
  }

}

// run the data buffer script
require_once('config.inc.php');
$api = new DataBuffer($remoteCsvUrl, $localNotesFile, $localBufferFile, $checkIntervalSeconds);
echo $api->getCsvData();
