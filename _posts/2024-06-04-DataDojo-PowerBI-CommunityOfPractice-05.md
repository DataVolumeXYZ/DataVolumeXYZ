---
layout: post
title: "The Data Dojo: A Power BI Community of Practice (Part&nbsp;5)"
summary: A tour-de-force of the Data Dojo Report Template, which we provide to our members to give them a sturdy foundation upon which to develop reports of their own. 
author: JamesDBartlett3
feature-img: assets/img/data-dojo/matrix_aikido.png
thumbnail: assets/img/data-dojo/masked_cyberpunk_data_manga_dojo_c83fd4e5-c643-4ef8-96d6-b3e8469a77c2.jpg
tags:
  - Power BI
  - Community of Practice
  - Data Analytics
  - Data Dojo
  - Data Literacy
  - Knowledge Sharing
  - Power Query (M)
  - Dataflow
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

{% include aligner.html images="" column="auto" %}

# Introducing The Data Dojo Report Template

## Report Pages

## Notes Page

## Slicers & Filters

## Star Schema

## Explicit Measures


# Advanced Features

## Dataflow Magic

If you've been following this blog series, you'll recall from the previous post that our latest official Data Dojo report template includes a custom Power Query function called `fn_GetTableFromDataflow`, which can be invoked to fetch any table from any Dataflow in Power BI. In case you missed it, or you need a refresher, click to expand the section below for a recap:

TODO: Wrap section in accordion
TODO: Replace with the version submitted to Oscar's repo

```fsharp
// fn_GetTableFromDataflow
// This function returns a table from a Dataflow in Power BI

// -- RowLimit Parameter Notes --
// During the development stages of any new Power BI report/model, 
// Power BI Desktop automatically refreshes all modified queries every 
// time the report author applies their changes in Power Query. 
// This interrupts the report author's workflow and hampers progress, 
// especially when the refresh takes a long time.
// To avoid this problem, the report author should use the RowLimit 
// parameter to temporarily limit the number of rows returned by this 
// function during the data modeling stage of development, and then 
// remove the limit (by passing -1 as the RowLimit parameter) when 
// the model is ready for testing.

(
  Workspace as text,
  Dataflow as text,
  Table as text,
  RowLimit as number
) as table =>
let
  Source = PowerPlatform.Dataflows(null),
  WorkspaceList = Source{[Id="Workspaces"]}[Data],
  SelectedWorkspace = 
    try WorkspaceList{[workspaceName=Workspace]}[Data]
    otherwise WorkspaceList{[workspaceId=Workspace]}[Data],
  SelectedDataflow = 
    try SelectedWorkspace{[dataflowName=Dataflow]}[Data]
    otherwise SelectedWorkspace{[dataflowId=Dataflow]}[Data],
  SelectedTable = SelectedDataflow{[entity=Table,version=""]}[Data],
  FilterLogic = if RowLimit < 0
    then SelectedTable
    else Table.FirstN(SelectedTable, RowLimit)
in
  FilterLogic
```

To import a table from a Dataflow in Power BI, the report author only needs to invoke the `fn_GetTableFromDataflow` function, passing in the name (or ID) of the Power BI Workspace, the name (or ID) of the target Dataflow, the name of the table, and the number of rows to retrieve. For example, to import the `FactExamScore` table from the `DataWarehouse` Dataflow in the `DataDojo` Workspace, limiting the results to one million rows for testing purposes, the report author must simply enter those values into the parameter fields in the `fn_GetTableFromDataflow` function's UI and click `Invoke`, and then a new query containing the following M code will be automatically generated:

```fsharp
let
  Source = fn_GetTableFromDataflow(
    "DataDojo", "DataWarehouse", "FactExamScore", 1000000
  )
in
  Source
```

Armed with the `fn_GetTableFromDataflow` function and our centrally-managed Dataflows, Data Dojo members can easily import any table from our Data Warehouse into their Power BI report/model without having to learn how to write SQL or M queries, and without having to worry about future changes to the server name, database name, etc. This is a huge time-saver, significantly lowering the barrier to entry for new report authors, and helping to ensure that everyone is using the same standardized, approved version of each table. 


## Field Parameters

## Calculation Groups

## Integrated VertiPaq Analyzer

<!-- add image of data ninjas with code -->

# Striking the Perfect Balance



# Next Time: The Data Dojo - Office Hours & Coffee Lounge
In the next installment of this series, we'll talk about a brand new format for the Data Dojo, which we call "Office Hours & Coffee Lounge," why we decided to add this new format to our repertoire, and how it's been going so far. Stay tuned!  

{% include aligner.html images="" column="auto" %}

{% include blog/blog_series_pager.liquid series=page.series %}

## Bonus: Data Dojo featured on Havens Consulting YouTube Channel!
[![Data Dojo featured on Havens Consulting YouTube Channel!](../../../assets/img/data-dojo/data-dojo-havens-consulting-youtube.png)](https://www.youtube.com/watch?v=OlvXbg6VjFE&list=PLzN99cpDw6oBsWZ-5CPVwGZqAQ1otRh1q&t=326s){:target="_blank"}