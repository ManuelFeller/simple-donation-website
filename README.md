[![Node.js CI](https://github.com/ManuelFeller/simple-donation-website/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/ManuelFeller/simple-donation-website/actions/workflows/node.js.yml)

# Simple Donation Website

A GatsbyJS based project to generate a website that can be used to ask for donations and also allow people to give feedback - using Google Forms &amp; Google Spreadsheets as "backend".

It was started by a small group of people that wanted to run donation campaigns for people in the Ukraine. The goal was to have something that we can advertise in our company, but still allow family members and friends of our colleagues to participate too.

It requires a specific setup inside the main Google Spreadsheet that is used as a data source and also some manual work in creating the Google Form(s) and linking the results into the Data Source Spreadsheet.

This repository provides the part of the toolchain that generates a static website that displays the status of the donation campaign(s). This consists of a list with

- what article is needed
- how much of that article overall
- how much is already donated / on the way
- how much is still needed

The donators can "register" their donations (when they ordered them to the collection point for the campaign) so that all others have an overview what is still needed and what may already be fully covered.

## What this is not or does not

- it is not a crowdfunding platform
- it is not helping you to track the incoming deliveries
- it is not a fully integrated system that can be used without any coding knowledge

## How can I use this?

[See the setup documentation](documentation/setup.md)

## Can I see this in action?

A demo page will hopefully come soonish...
