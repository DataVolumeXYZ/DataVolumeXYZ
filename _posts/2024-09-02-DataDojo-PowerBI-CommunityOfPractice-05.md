---
layout: post
title: "The Data Dojo: A Power BI Community of Practice (Part&nbsp;5)"
summary: A tour-de-force of the Data Dojo Report Template, which we provide to our members to give them a sturdy foundation upon which to develop reports of their own.
author: JamesDBartlett3
feature-img: assets/img/data-dojo/matrix_aikido.png
thumbnail: assets/img/data-dojo/ae896172-0bd7-4d20-ba30-e8a6d0574b04_cropped.jpg
tags:
  - Power BI
  - Community of Practice
  - Data Analytics
  - Data Dojo
  - Data Literacy
  - Knowledge Sharing
  - Power Query (M)
  - Star Schema
  - Dataflow
  - Date Dimension
  - VertiPaq Analyzer
  - Template
excerpt_start: <!--excerpt-->
excerpt_separator: <!--more-->
draft: true
series: data-dojo
description: A series about founding and fostering a successful Power BI Community of Practice
---

<!-- intro -->
<!--excerpt-->
{% if layout == default %}
This is the fifth installment in a series documenting the challenges, progress, setbacks, and victories of The Data Dojo: A Power BI Community of Practice.

In this post, we'll take a closer look at the latest Data Dojo template, tinker with more of its capabilities, and talk about how to strike the right balance when designing a Power BI template that's both simple enough for a beginner **and** versatile enough for a seasoned pro.
{% endif %}
<!--more-->

{% include blog/blog_series_overview.liquid series=page.series %}

Thank you for joining us on this adventure!


# The Data Dojo Power BI Report Template

<!-- TODO: Add section summary -->

{% include aligner.html images="../../../assets/img/data-dojo/report-template-72060c18-e82b-447e-87d5-06721145b18c_cropped.jpg" column="auto" %}

## Overview

The Data Dojo Power BI Report Template is a comprehensive Power BI report template that we provide to the Data Dojo members to give them a sturdy foundation upon which to develop reports of their own. It's designed to be simple, versatile, and user-friendly, with a focus on best practices in data visualization, data modeling, and report design.

The template includes a variety of features, like a handful of example report pages, a hidden Notes page, sample data imported from a flat file and modeled in a proper Star Schema, a designated Date Dimension for proper Time Intelligence calculations, explicit DAX measures, conditional formatting, slicers in various configurations, scrims, overlays, and more. It also incorporates several advanced features, like a custom Power Query function for importing tables from Power Platform Dataflows, and an integrated VertiPaq Analyzer in DAX Query View for model performance tuning.

The Data Dojo Power BI Report Template is intended to be a starting point for report development, and users are encouraged to customize it to suit their specific needs and preferences. It is also constantly under development, with new features and improvements being added regularly based on feedback from the Data Dojo members and ideas from the Power BI community.

<!-- TODO: Accordion collapse everything H2 and below -->

## Report Pages

<!-- TODO: Add descriptions, and screenshots -->

### Instructions
This page displays a tabbed interface with six sections:
1. **Intro**: Welcome message and overview of the report template.
2. **Demo Pages**: Description of each of the example report pages.
3. **DAX**: Brief introduction to the DAX language, the `_Measures` table, and the `DAX Query View` feature.
4. **Power Query / M**: Brief introduction to the Power Query language and data transformation.
5. **Data Modeling**: Overview of Model View, Star Schema, Relationships, Cardinality, and Cross-Filter Direction.
6. **Help & Resources**: Links to additional resources for learning Power BI, including LinkedIn Learning courses, Learning Paths on Microsoft Learn, free "Dashboard in a Day" webinars, etc.

### Horizontal Slicers
This page features slicers in the horizontal layout with "chiclet style" buttons. It also features a table visual with conditional formatting of the row color, a tooltip with conditional formatting that appears when hovering over a row, and a special "Infotip" icon that reveals a special message when hovered over.

### Vertical Slicers
This page has slicers in the vertical layout, with checklist and radio button styles.

### Slicer Panel
This page showcases a slicer panel which can be expanded and collapsed to save space on the report canvas.

<!-- ### Drillthrough (Hidden) -->

### Tooltip (Hidden)
This is a special type of page that is hidden when the report is published, but is used to create a tooltip to display when hovering over specific parts of visuals in other pages. It contains a [(new) Card visual](https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-new-card) with 8 different measures, and conditional formatting on both the card background and the text color on one of the measures. The tooltip is then linked to the visual on another page using the "Tooltip" field in the visual's formatting pane.

### Infotip (Hidden)
This is another special type of page that is hidden when the report is published, but is used to create an "Infotip" that appears when hovering over a special icon in the table visual on the "Horizontal Slicers" page. The Infotip contains a message that explains how to interpret the conditional formatting on the rows in the table.

### Developer Notes (Hidden)
This page contains a text box for the report developer to keep their notes, including information on the data model, DAX measures, and other technical details about the report. When the report is published, this page is hidden from view, but it can be accessed by the report developer when they are making changes to the report in Power BI Desktop.

## Slicers & Filters

<!-- TODO: Add slicers and filters descriptions and screenshots -->

## Star Schema

<!-- TODO: Add star schema description, screenshot, and M code -->

## Date Dimension

<!-- TODO: Add date dimension description, screenshot, and M code -->

## Explicit Measures

<!-- TODO: Add explicit measures description, screenshot, and DAX code -->

## Conditional Formatting

<!-- TODO: Add standard conditional formatting in visuals, color-changing slicers, etc. -->

## Scrims & Overlays

<!-- TODO: Add scrim and overlay descriptions and screenshots -->

## Advanced Features

<!-- TODO: Add section summary -->


### Dataflow Magic

If you've been following this blog series, you'll recall from the previous post that our latest official Data Dojo report template includes a custom Power Query function called `fn_GetTableFromDataflow`, which can be invoked to fetch any table from any Dataflow in Power BI. In case you missed it, or you need a refresher, click here for a recap:
[The Dao of the Dataflow](../../../2024/01/15/DataDojo-PowerBI-CommunityOfPractice-04.html#The-Dao-of-the-Dataflow){:target="_blank"}

### Report & Model Settings

- Hide visual headers
- Discourage implicit measures
- Disable auto-date/time intelligence
- `_Measures` table with `Formatting` and `Calculation` folders
- TODO: add more

### Integrated "VertiPaq Analyzer Lite"

<!-- TODO: Add VertiPaq Analyzer screenshot -->

If you're not already familiar with the [VertiPaq Analyzer](https://www.sqlbi.com/tools/vertipaq-analyzer/), it's a fantastic tool for analyzing the performance of a Power BI semantic model, but until just a few months ago, it required the use of external tools like Microsoft Excel, [DAX Studio](https://www.sqlbi.com/tv/introducing-vertipaq-analyzer-in-dax-studio/), or [Tabular Editor 3](https://data-goblins.com/power-bi/analyze-power-bi-dataset), so it wasn't very practical for business users and self-service data analysts.

However, thanks to [Hariharan Rajendran](https://in.linkedin.com/in/imhariharanr)'s [brilliant](https://haribiacademy.com/2024/03/vertipaq-analyzer-inside-powerbi-desktop-dax-query-view/) [work](https://github.com/rhariharaneee/Power-BI), we now have a way to access the VertiPaq Analyzer data directly within Power BI Desktop via the DAX Query View, so now the Data Dojo report template has a "VertiPaq Analyzer Lite" built right in. This provides our Data Ninjas with a great way to identify and address performance issues in their Power BI semantic models, and thereby improve the overall performance of their reports, all without ever having to install or learn to use any external tools.

# Balance: Simplicity & Versatility

It's important to strike the right balance between simplicity and versatility while designing a Power BI report template, and here are several reasons why:

1. **User-Friendliness**: A simple design makes it easier for users to understand, navigate, and use the report effectively without feeling overwhelmed by too many features or complex visuals. It helps in reducing cognitive load which encourages faster adoption and familiarity with the report by its stakeholders.
2. **Scalability & Adaptability**: While simplicity is key, versatility ensures that your report template can cater to a variety of data scenarios and business needs without requiring significant rework or customization each time it's used. This flexibility will save a great deal of time and resources in the long run.
3. **Consistency**: A well-designed Power BI report template, if adopted throughout the organization, will lead to consistency in visual representation of data across the organization's Power BI reports. This uniformity helps users to interpret the data quickly as they become familiar with the layout and style of reporting.
4. **Customization & Personalization**: Versatility also enables customization according to individual user needs or departmental requirements, without compromising on the overall structure and integrity of the report template. This adds value by giving report authors and users a deeper sense of involvement in the data analysis process, which can lead to higher engagement levels.
5. **Speed & Efficiency**: A simple yet versatile Power BI template helps save time, as it reduces the need for extensive training or repeated queries. Users can quickly understand and apply the insights they gain from reading the report without spending excessive amounts of time on comprehension or seeking assistance, resulting in improved efficiency within their roles.

<!-- TODO: add image of data ninjas practicing crane stance -->
{% include aligner.html images="" column="auto" %}

# Conclusion

<!-- TODO: Add conclusion -->

# Resources
<!-- TODO: Add download links -->

# Next Time: The Data Dojo - Office Hours & Coffee Lounge
In the next installment of this series, we'll talk about a brand new format for the Data Dojo, which we call "Office Hours & Coffee Lounge," why we decided to add this new format to our repertoire, and how it's been going so far. Stay tuned!

{% include blog/blog_series_pager.liquid series=page.series %}

## Bonus: Data Dojo featured on Havens Consulting YouTube Channel!
[![Data Dojo featured on Havens Consulting YouTube Channel!](../../../assets/img/data-dojo/data-dojo-havens-consulting-youtube.png)](https://www.youtube.com/watch?v=OlvXbg6VjFE&list=PLzN99cpDw6oBsWZ-5CPVwGZqAQ1otRh1q&t=326s){:target="_blank"}