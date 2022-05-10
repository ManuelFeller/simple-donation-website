import { Avatar } from '@mui/material';
import React from 'react';
import { Campaign } from '../types/campaign';

const campaignCardMap: { [campaignType in Campaign['CampaignType']]: string } = {
  civilianSupport: '/media/campaign-types/9203968_ukraine_of_spikelet_wheat.svg',
  medicalSupport: '/media/campaign-types/9203976_field_care_medical_hospital_military.svg',
  civilianProtection: '/media/campaign-types/9203979_war_mobilization_soldier_father_child_mother_family.svg',
  financialSupport: '/media/campaign-types/9153349_free_icons_design_ukraine_nation_country_love_heart.svg',
  generalSupport: '/media/campaign-types/9153349_free_icons_design_ukraine_nation_country_love_heart.svg',
  volunteering: '/media/campaign-types/9153349_free_icons_design_ukraine_nation_country_love_heart.svg',
};

const CampaignAvatar = ({ campaignType, title }: { campaignType: Campaign['CampaignType']; title: string }) => (
  <Avatar variant="square" aria-label={title} title={title} src={campaignCardMap[campaignType]}></Avatar>
);

export default CampaignAvatar;
