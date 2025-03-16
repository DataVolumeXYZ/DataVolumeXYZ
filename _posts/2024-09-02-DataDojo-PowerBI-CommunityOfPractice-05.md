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

The Data Dojo Power BI Report Template is a starter file that we provide to the Data Dojo members to give them a sturdy foundation upon which to develop reports of their own. It's designed to be simple, versatile, and user-friendly, with a focus on best practices in data visualization, data modeling, and report design. It is intended to be a starting point for report development, and users are encouraged to customize it to suit their specific needs and preferences. It is also constantly under development, with new features and improvements being added regularly based on feedback from the Data Dojo members and ideas from the Power BI community.

{% include aligner.html images="data-dojo/report-template-72060c18-e82b-447e-87d5-06721145b18c_cropped.jpg" column="auto" %}

## Overview

The Data Dojo Power BI Report Template includes a variety of helpful features, like an Instructions page, three example report pages, a Developer Notes page, sample data imported from a flat file and modeled in a proper Star Schema, a designated Date Dimension for Time Intelligence calculations, Explicit Measures, conditional formatting, slicers in various configurations, scrims, overlays, and more. It also incorporates several advanced features, such as a collection of custom Power Query functions for importing and transforming data, and an integrated VertiPaq Analyzer in DAX Query View for model performance tuning.

## Report Pages

The Data Dojo Power BI Report Template includes the following report pages, each of which demonstrates a different aspect of Power BI report design and functionality:

### Instructions
This page displays a tabbed interface with six sections:
1. **Intro**: Welcome message and overview of the report template.
2. **Demo Pages**: Description of each of the example report pages.
3. **DAX**: Brief introduction to the DAX language, the `_Measures` table, and the `DAX Query View` feature.
4. **Power Query / M**: Brief introduction to the Power Query language and data transformation.
5. **Data Modeling**: Overview of Model View, Star Schema, Relationships, Cardinality, and Cross-Filter Direction.
6. **Help & Resources**: Links to additional resources for learning Power BI, including LinkedIn Learning courses, Learning Paths on Microsoft Learn, free "Dashboard in a Day" webinars, etc.

{% include aligner.html images="data-dojo/report-template/instructions-intro.jpg" column="auto" alt="Instructions page of the Data Dojo Power BI Report Template showing a tabbed interface with sections for Intro, Demo Pages, DAX, Power Query / M, Data Modeling, and Help & Resources" description="The Instructions page, featuring a tabbed interface for easy navigation" %}

### Horizontal Slicers
This page features slicers in the horizontal orientation with rounded rectangle (a.k.a. "chiclet") buttons. It also features a table visual with conditional formatting on fill color, a tooltip with conditional formatting that appears when hovering over a row, and a special "Infotip" icon on the table visual that reveals helpful information about the conditional formatting when hovered over.

{% include aligner.html images="data-dojo/report-template/horizontal-slicers.jpg" column="auto" alt="Horizontal Slicers page of the Data Dojo Power BI Report Template showing horizontal slicers with rounded rectangle buttons, a table visual with conditional formatting, and an Infotip icon" description="The Horizontal Slicers page, featuring a table visual <br/>with conditional formatting and an Infotip icon" %}

### Vertical Slicers
This page has slicers in the vertical orientation, with both multi-select (a.k.a. "checklist") and single-select (a.k.a. "radio button") styles. It also has a [Line and Clustered Column Chart](https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-combo-chart?tabs=powerbi-desktop) visual with a date hierarchy on the X-axis to demonstrate the various [Drill Modes](https://learn.microsoft.com/en-us/power-bi/consumer/end-user-drill).

{% include aligner.html images="data-dojo/report-template/vertical-slicers.jpg" column="auto" alt="Vertical Slicers page of the Data Dojo Power BI Report Template showing vertical slicers with multi-select and single-select styles, and a Line and Clustered Column Chart visual with a date hierarchy on the X-axis" description="The Vertical Slicers page, featuring slicers with multi-select and single-select styles, <br/>and a Line and Clustered Column Chart visual with a date hierarchy on the X-axis" %}

### Slicer Panel
This page showcases a slicer panel which can be expanded and collapsed to save space on the report canvas. This technique is achieved using a combination of bookmarks, buttons, and object visibility settings in the Selection Pane, and it can be a great way to give users a broad selection of slicers for filtering the data in the report without cluttering the report canvas. However, the slicer panel technique also requires a fair amount more work to create and maintain than standard slicers, so it should be used judiciously, and only when necessary to meet specific user requirements.
<table>
	<tr>
		<td>
			{% include aligner.html images="data-dojo/report-template/slicer-panel-hidden.jpg" column="auto" alt="Slicer Panel page of the Data Dojo Power BI Report Template showing a hidden slicer panel with a button to expand it" description="The Slicer Panel page with hidden slicer panel and 'Show Slicers' button" %}
		</td>
	</tr>
	<tr>
		<td>
			{% include aligner.html images="data-dojo/report-template/slicer-panel-visible.jpg" column="auto" alt="Slicer Panel page of the Data Dojo Power BI Report Template showing an expanded slicer panel with multiple slicers visible" description="The Slicer Panel page with visible slicer panel and 'Hide Slicers' button" %}
		</td>
	</tr>
</table>

<!-- ### Drillthrough (Hidden) -->

### Tooltip (Hidden)
This is a special type of page that is hidden when the report is published, and is used to create a tooltip that displays when hovering over specific parts of visuals in other pages. It contains a [(new) Card visual](https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-new-card) with 8 different measures, and conditional formatting on both the background color behind the cards and the text color inside one of the cards. This tooltip displays when the user hovers over any row in the table visual on the "Horizontal Slicers" page, and the conditional formatting of the background and text colors is based on the positive or negative value of the "Total Profit" measure, which is displayed in the tooltip, but not in the table visual itself.
<table>
	<tr>
		<td style="width:28%; text-align:center;">
			When <b>Total Profit</b> <br/>value is <span style='color:green;'><b>positive</b></span>
		</td>
		<td>
			{% include aligner.html images="data-dojo/report-template/tooltip-positive-profit.jpg" column="auto" alt="Tooltip page of the Data Dojo Power BI Report Template showing a (new) Card visual with positive Total Profit value" description="✅ No action required;<br/>Do not activate conditional formatting" %}
		</td>
	</tr>
	<tr>
		<td style="text-align:center;">
			When <b>Total Profit</b> <br/>value is <span style='color:red;'><b>negative</b></span>
		</td>
		<td>
			{% include aligner.html images="data-dojo/report-template/tooltip-negative-profit.jpg" column="auto" alt="Tooltip page of the Data Dojo Power BI Report Template showing a (new) Card visual with negative Total Profit value and conditional formatting turning both the background color and text color red, to draw the user's attention" description="⚠️ Action required!<br/>Activate conditional formatting to draw user's attention" %}
		</td>
	</tr>
</table>

### Infotip (Hidden)
This is another special type of page that is hidden when the report is published, and is used to display an "Infotip" when hovering over a specific object in the report. In this case, it will appear when the user hovers over a special "Info" icon in the upper-right corner of the table visual on the "Horizontal Slicers" page, and it will display a message that explains the meaning of the conditional formatting in the visual to which it is attached.

{% include aligner.html images="data-dojo/report-template/infotip.jpg" column="auto" alt="Infotip page of the Data Dojo Power BI Report Template showing a message explaining the meaning of the conditional formatting in the table visual to which it is attached" description="'Infotip' on a table visual with a message explaining <br/>its conditional formatting and Tooltip features" %}

### Developer Notes (Hidden)
This page contains a text box for the report developer to write and keep their notes, including information on the data model, DAX measures, and other technical details about the report. When the report is published, this page is hidden from view, but it can be accessed by the report developer when they open the report in Power BI Desktop.

{% include aligner.html images="data-dojo/report-template/developer-notes.jpg" column="auto" alt="Developer Notes page of the Data Dojo Power BI Report Template showing a text box for the report developer to write and keep their notes" description="Developer Notes page with a text box for writing and keeping notes" %}

## Slicers & Filters

Power BI has a feature called the Filter Pane which can be used to filter the data at the report, page, or individual visual level, which makes it an incredibly flexible and powerful tool in the right hands. However, that same flexibility and power can make the Filter Pane confusing and overwhelming for report users, and to make matters worse, the Filter Pane can also be difficult for the report developer to style and format to match the rest of the report's design. Slicers, on the other hand, are much easier to style and format, and they are also more intuitive for users to interact with. 

Thus, the Filter Pane in the Data Dojo Report Template is hidden from report users by default, and only visible to the report developer when editing the report. This is a deliberate design choice, intended to simplify the report developer's work and reduce the cognitive load on the report's users, resulting in a better overall experience for everyone, and more active engagement with the report. That being said, there are other schools of thought on this subject, and the battle of Slicers vs. Filter Pane has been raging for almost as long as Power BI has been around, so you should consider the pros and cons of these different approaches, and choose whichever works best for your specific report and its intended audience.

{% include aligner.html images="data-dojo/report-template/power_bi_slicer_filter_pane_sparring.png" column="auto" alt="Illustration of Power BI Slicer and Filter Pane sparring in a martial arts dojo" %}

## Star Schema

One of the core tenets of good data modeling in Power BI is the use of a Star Schema, which is a simple and intuitive way to organize the data tables in a hub-and-spoke configuration, with a central Fact table surrounded by Dimension tables. The Fact table contains the numerical data to be aggregated and analyzed, like sales amounts, quantities, and counts, while the Dimension tables contain the descriptive attributes that will be used to filter, group, or slice-and-dice through the data, like dates, products, customers, etc. This configuration is called a "Star Schema" because when drawn on paper, it looks like a star, with the Fact table in the center and the Dimension tables radiating out from it, like the points of a star.

The Star Schema structure is easy to understand and work with, and it's also the most efficient for querying and aggregating data in DAX, which makes it the ideal structure for Power BI semantic models. The Data Dojo report template includes a sample Star Schema with a Fact table called `FactSales` and several Dimension tables, including `DimProduct`, `DimDate`, `DimCountry`, etc., each of which is connected to the `FactSales` table by a "one-to-many" relationship. This Star Schema is designed to be a starting point that report developers can use as a guide when building their own semantic models.

{% include aligner.html images="data-dojo/report-template/star-schema.jpg" column="auto" alt="A basic Star Schema of the sample data in the Data Dojo Power BI Report Template, featuring a central Fact table (FactSales) surrounded by several Dimension tables (DimProduct, DimSegment, DimDiscountBand, DimDate, DimCountry), and a dedicated Measures table (_Measures) off to the side" description="A basic Star Schema in the Model View, featuring a dedicated Measures table<br/>and a central Fact table surrounded by its Dimension tables" %}

## Date Dimension

The Date Dimension in a Power BI semantic model is a special type of Dimension table that contains a continuous sequence of dates, usually one row per day, along with a variety of attributes that describe each date, like the day of the week, the month, the quarter, the year, etc. The Date Dimension is a critical component of any Power BI semantic model, because it enables Time Intelligence calculations, like year-over-year comparisons, month-to-date totals, rolling averages, etc., which are essential for many types of business analysis.

The Data Dojo report template includes a sample Date Dimension table called `DimDate`, which contains a continuous sequence of 456 days, with the most recent date dynamically set to the day before the most recent refresh, along with a variety of attributes that describe each date, like the year, month number, month name, day of the week, etc. Thus, `DimDate` is designed to simulate a typical Date Dimension that report developers might find in a real-world Data Warehouse, which usually contain data up to the previous day, and are updated nightly with new data. `DimDate` is also tagged as a "Date Table" in Power BI, which tells Power BI to treat it as a special type of table that can be used for Time Intelligence calculations like those mentioned above.

{% include aligner.html images="data-dojo/report-template/dimdate.jpg" column="auto" alt="A sample Date Dimension table (DimDate) in the Data Dojo Power BI Report Template, showing a continuous sequence of dates with various attributes like year, month number, month name, day of the week, etc." description="A sample Date Dimension table (DimDate) in the Power Query Editor, <br/>showing a continuous sequence of dates and various attributes" %}

## Explicit Measures

Explicit Measures are DAX formulas that are created by the report developer to perform specific calculations on the data in the semantic model, like sums, averages, counts, etc. These measures are called "explicit" because they are explicitly defined by the report developer, rather than being automatically generated by Power BI, which are called "implicit" measures. Explicit Measures are preferred over Implicit Measures because they are more flexible and powerful, and they can be customized to suit the specific needs of the report, whereas Implicit Measures are limited in their functionality and can be difficult to work with in certain scenarios. 

The Data Dojo report template includes a variety of Explicit Measures, and they are all stored in the `_Measures` table, which is organized into two folders, `Formatting` and `Calculation`. These folders are used to group the measures by their function or purpose -- `Formatting` for measures that control the appearance of objects on the report canvas, like colors, fonts, etc., and `Calculation` for measures that perform calculations on the data, like sums, averages, etc. The Explicit Measures in the Data Dojo report template are intended to demonstrate best practices in DAX formula writing, like proper formatting, consistent naming conventions, etc., and to serve as a model for report developers to follow when creating their own measures.

{% include aligner.html images="data-dojo/report-template/measures.jpg" column="auto" alt="A dedicated Measures table (_Measures) in the Data Dojo Power BI Report Template, showing two folders (Calculation and Formatting) with various Explicit Measures for performing calculations on the data and controlling the appearance of objects on the report canvas" description="A dedicated Measures table (_Measures) with two folders (Calculation and Formatting) containing various Explicit Measures, alongside an example of a measure which changes a slicer's background color to visually indicate when it is active" %}

## Conditional Formatting

Several visuals in the Data Dojo Report Template have conditional formatting applied to them, which changes the appearance of the visual based on the data being displayed in it. For example, the table visual on the "Horizontal Slicers" page has conditional formatting on the fill color of the cells, which changes the color of the cells in the row based on the value in the "Segment" column and the "Total Sales" measure, both of which are displayed in the table. Conditional formatting like this can make it easier for the report user to notice patterns and trends in the data, and to quickly identify outliers or anomalies. That same table visual also features a tooltip with its own conditional formatting, which appears when the user hovers over a row, and displays additional information about the data in that row, like the "Total Profit" measure, which is not displayed in the table itself.

{% include aligner.html images="data-dojo/report-template/conditional-formatting.jpg" column="auto" alt="A table visual with conditional formatting on the fill color of the cells, based on the value of a DAX Measure" description="A table visual with conditional formatting on the fill color of the cells,<br/>based on the value of a DAX Measure" %}

The slicers in the Data Dojo Report Template also have a special conditional formatting feature that's worth mentioning: When the user selects one or more values in a slicer on a report page, that slicer's background color will change, as will the color of the "Clear Slicers" button on that page. Report users often forget that they have applied a filter to the data in the report, and this can lead to confusion, frustration, and even a bad business decision based on faulty interpretation of the data. To help prevent situations like that from occurring, this feature gives report users a clear visual reminder that the data they are seeing is not the full dataset, but rather a subset of the data based on the slicer selections they have made. This can help reduce the likelihood of errors and misunderstandings, and improve the overall quality of the data analysis process.

{% include aligner.html images="data-dojo/report-template/dynamic-slicer-color.jpg" column="auto" alt="A screenshot of slicers with conditional formatting applied to their background color, which changes when the user selects one or more values in the slicer" description="A screenshot of slicers with conditional formatting applied to their background color,<br/>which changes when the user selects one or more values in the slicer" %}

## Scrims & Overlays

Scrims and Overlays are design techniques that can be used to enhance the visual appearance and usability of a Power BI report, and to make it more engaging and informative for the user. 

A scrim is a semi-transparent layer that is placed over a visual or group of visuals to draw attention to a specific part of the report, like a title, a key metric, or a call-to-action. A scrim can be used to make the text on the report more readable, to create a visual hierarchy on the report canvas, or to add a layer of interactivity to the report. Alternatively, scrims can be used to mask or obscure parts of the report that are not relevant to the user at that moment, or to create a sense of depth or dimensionality in the report design. 

An overlay is a report design technique that is used to display additional information or controls on top of a visual or group of visuals, like a tooltip, a slicer panel, or a navigation menu. Overlays can be used to provide context or explanation for the data being displayed, to give the user more control over the data analysis process, or to add interactivity to the report. 

The Data Dojo Report Template features several examples of scrims and overlays, including two overlays on the "Horizontal Slicers" page in the form of a Tooltip and an Infotip, and a combination of scrims and overlays on the "Slicer Panel" page which are used to create an expandable and collapsible slicer panel with a "frosted glass" effect that partially obscures the report page when the panel is expanded. 

{% include aligner.html images="data-dojo/report-template/glassmorphism.jpg" column="auto" alt="A combination of scrims and overlays on the Slicer Panel page of the Data Dojo Power BI Report Template, showing an expandable and collapsible slicer panel with a 'frosted glass' effect that partially obscures the report page when the panel is expanded" description="A combination of scrims and overlays on the Slicer Panel page, <br/>showing an expandable and collapsible slicer panel with a 'frosted glass' effect" %}

## Advanced Features

The Data Dojo Report Template includes several advanced features that are designed to enhance the functionality and usability of the report, and to make it easier for report developers to create and maintain their reports. These features include:

### Dataflow Magic

If you've been following this blog series, you'll recall from the previous post that our latest official Data Dojo report template includes a custom Power Query function called `fn_GetTableFromDataflow`, which can be invoked to fetch any table from any Dataflow in Power BI. In case you missed it, or you need a refresher, click here for a recap:
[The Dao of the Dataflow](../../../2024/01/15/DataDojo-PowerBI-CommunityOfPractice-04.html#The-Dao-of-the-Dataflow){:target="_blank"}

### Report & Model Settings

- Hide visual headers
- Discourage implicit measures
- Disable auto-date/time intelligence

### Integrated "VertiPaq Analyzer Lite"

If you're not already familiar with the [VertiPaq Analyzer](https://www.sqlbi.com/tools/vertipaq-analyzer/), it's a fantastic tool for analyzing the performance of a Power BI semantic model, but until just a few months ago, it required the use of external tools like Microsoft Excel, [DAX Studio](https://www.sqlbi.com/tv/introducing-vertipaq-analyzer-in-dax-studio/), or [Tabular Editor 3](https://data-goblins.com/power-bi/analyze-power-bi-dataset), so it wasn't very practical for business users and self-service data analysts.

However, thanks to [Hariharan Rajendran](https://in.linkedin.com/in/imhariharanr)'s [brilliant](https://haribiacademy.com/2024/03/vertipaq-analyzer-inside-powerbi-desktop-dax-query-view/) [work](https://github.com/rhariharaneee/Power-BI), we now have a way to access the VertiPaq Analyzer data directly within Power BI Desktop via the DAX Query View, so now the Data Dojo report template has a "VertiPaq Analyzer Lite" built right in. This provides report developers with a great way to identify and address performance issues in their Power BI semantic models, and thereby improve the overall performance of their reports, all without ever having to install or learn to use any external tools.

{% include aligner.html images="data-dojo/report-template/vertipaq-analyzer-lite.jpg" column="auto" alt="A screenshot of 'VertiPaq Analyzer Lite' in the Data Dojo Power BI Report Template, showing DAX Query View with performance metrics for the Power BI semantic model" description="A screenshot of 'VertiPaq Analyzer Lite' in DAX Query View, <br/>showing performance metrics for the Power BI semantic model" %}

# Balance: Simplicity & Versatility

It's important to strike the right balance between simplicity and versatility while designing a Power BI report template, and here are several reasons why:

1. **User-Friendliness**: A simple design makes it easier for users to understand, navigate, and use the report effectively without feeling overwhelmed by too many features or complex visuals. It helps in reducing cognitive load which encourages faster adoption and familiarity with the report by its stakeholders.
2. **Scalability & Adaptability**: While simplicity is key, versatility ensures that your report template can cater to a variety of data scenarios and business needs without requiring significant rework or customization each time it's used. This flexibility will save a great deal of time and resources in the long run.
3. **Consistency**: A well-designed Power BI report template, if adopted throughout the organization, will lead to consistency in visual representation of data across the organization's Power BI reports. This uniformity helps users to interpret the data quickly as they become familiar with the layout and style of reporting.
4. **Customization & Personalization**: Versatility also enables customization according to individual user needs or departmental requirements, without compromising on the overall structure and integrity of the report template. This adds value by giving report authors and users a deeper sense of involvement in the data analysis process, which can lead to higher engagement levels.
5. **Speed & Efficiency**: A simple yet versatile Power BI template helps save time, as it reduces the need for extensive training or repeated queries. Users can quickly understand and apply the insights they gain from reading the report without spending excessive amounts of time on comprehension or seeking assistance, resulting in improved efficiency within their roles.

{% include aligner.html images="data-dojo/report-template/data_ninjas_balance_1.png" column="auto" alt="A team of Data Ninjas practicing balance moves with their laptops"%}

# Conclusion

In conclusion, the Data Dojo Power BI Report Template is a powerful and flexible tool that can help report developers create high-quality reports quickly and easily. It incorporates best practices in data modeling, DAX formula writing, and report design, while also providing a variety of advanced features that can enhance the functionality and usability of the report. By striking the right balance between simplicity and versatility, the Data Dojo Report Template is designed to be user-friendly for beginners while also being powerful enough for seasoned pros. We encourage all Data Dojo members to explore the features of the Data Dojo Report Template, and to use it as a starting point for their own reports. We also welcome feedback and suggestions for improvements, as we are constantly looking for ways to enhance the template and make it even more useful for our members.

# Resources
<!-- TODO: Add download links -->

# Next Time: The Data Dojo - Office Hours & Coffee Lounge
In the next installment of this series, we'll talk about a brand new format for the Data Dojo, which we call "Office Hours & Coffee Lounge," why we decided to add this new format to our repertoire, and how it's been going so far. Stay tuned!

{% include blog/blog_series_pager.liquid series=page.series %}

## Bonus: Data Dojo featured on Havens Consulting YouTube Channel!
[![Data Dojo featured on Havens Consulting YouTube Channel!](../../../assets/img/data-dojo/data-dojo-havens-consulting-youtube.png)](https://www.youtube.com/watch?v=OlvXbg6VjFE&list=PLzN99cpDw6oBsWZ-5CPVwGZqAQ1otRh1q&t=326s){:target="_blank"}