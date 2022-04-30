import { CardContent, LinearProgress } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import * as React from "react";

export interface Task {
  name: string;
  needed: number;
  donated: number;
  required: number;
}

const initiative = {
  title: "Army needs",
};

const Initiative1Page = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div>
      <h1>{initiative.title}</h1>

      {tasks.map((task) => (
        <Card>
          <CardHeader title={task.name}></CardHeader>
          <CardContent>
            <LinearProgress
              variant="determinate"
              value={task.required ? task.donated / task.required * 100 : 0}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Initiative1Page;
