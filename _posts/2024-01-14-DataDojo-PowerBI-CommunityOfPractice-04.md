---
layout: post
title: "The Data Dojo: A Power BI Community of Practice (Part&nbsp;4)"
author: JamesDBartlett3
feature-img: assets/img/data-dojo/matrix_aikido.png
thumbnail: assets/img/data-dojo/73b72522-d039-4f78-89b6-68738189a233_cropped.jpg
tags:
  - Power BI
  - Community of Practice
  - Data Analytics
  - Data Dojo
  - Data Literacy
  - Knowledge Sharing
  - Power Query
  - Dataflow
excerpt_start: <!--excerpt-->
excerpt_separator: <!--more-->
draft: true
description: A series about founding and fostering a successful Power BI Community of Practice
---

<!-- intro -->
<!--excerpt-->
This is the 4th installment in a series documenting the challenges, progress, setbacks, and victories of The Data Dojo: A Power BI Community of Practice. In this post, I'll tell you about our 4th and 5th workshops (our most important and impactful workshops yet), and I'll explain why I believe that every Power BI Community of Practice should host workshops like these at least once per quarter.
<!--more-->
- In [Part 1](../../../2023/04/02/DataDojo-PowerBI-CommunityOfPractice-01.html), I shared the story of how I founded the Data Dojo at [Des Moines University (DMU)](https://dmu.edu). 
- In [Part 2](../../../2023/05/28/DataDojo-PowerBI-CommunityOfPractice-02.html), I shared summaries of our 1st and 2nd workshops, and a cautionary tale about our first major setback. 
- In [Part 3](../../../2023/10/07/DataDojo-PowerBI-CommunityOfPractice-03.html), I shared a summary of our 3rd workshop, talked about our comeback story, and outlined our plans to ensure that the Data Dojo will continue to grow and thrive for many years to come. 

Thank you for joining us on this adventure!

{% include aligner.html images="data-dojo/73b72522-d039-4f78-89b6-68738189a233_cropped.jpg" column="auto" %}

# Workshop&nbsp;#4: The Data Dojo Strikes Back (Our 1st Hands&#8209;On Workshop)

We hosted our 4th workshop on September 19th, 2023, and it was attended by seventeen members. This was a significant improvement in turnout over our 3rd workshop, and an encouraging sign that the Data Dojo is finally back on track, healthy, and growing again. We were thrilled to welcome several new members to the Data Dojo for the first time at this workshop, and we're excited to not only help them discover their own unique paths to data literacy and mastery, but also to learn from them as they bring their own unique knowledge, perspectives, and experiences to the table.

This was also an exciting new milestone for us because, unlike any of our previous workshops (which mostly consisted of PowerPoint presentations and Q&A sessions), this was an **actual workshop** -- no slide deck, just a live, interactive tour of Power BI Desktop! Thus, it was our first true "workshop" in the traditional sense of the word.

We started by walking the participants through the process of installing Power BI Desktop from the Microsoft Store and downloading our official Data Dojo report template from our SharePoint site. Then, we opened the template in Power BI Desktop and took a tour of the template, pointing out some of its most useful features and explaining how they work. We also talked about the importance of using a standardized report template, and how it can help us to work together more effectively as a team, by ensuring that all of our reports are consistent, accessible, professional, and easy to use. Next, we pointed out the main UI components of Power BI Desktop and briefly explained what each one is used for:

- Report & Model Editor (Main Window)
  - Views
    - Report View
    - Table View
    - Model View
  - Panes
    - Data
    - Filter
    - Visualization
    - Selection
  - Ribbons
    - Home
    - Insert
    - Modeling
    - View
    - Optimize
    - Help
    - External Tools
- Power Query Editor ('Transform Data' Window)
  - Panes
    - Queries
    - Applied steps
  - Ribbons
    - Home
    - Transform
    - Add Column
    - View
    - Tools
    - Help

Finally, we wrapped up the workshop by giving the participants a chance to explore Power BI Desktop and the report template and ask questions, then we encouraged the participants to continue exploring and experiementing on their own, and to bring some specific questions about Power BI and/or ideas for reports they'd like to start building to our next workshop.

{% include aligner.html images="data-dojo/masked_cyberpunk_data_manga_dojo_25962e35-2be0-4801-b645-fae50d5411cb.jpg" column="auto" %}

# Workshop&nbsp;#5: The Dao of the Dataflow (Our 2nd Hands&#8209;On Workshop)

On December 5th, 2023, we hosted our 5th workshop, picking up right where we left off last time and diving deep into Power Query. This was our 2nd hands-on workshop, featuring an interactive walkthrough of the Power Query interface in Power BI Desktop, and a live demonstration of how to retrieve, transform, clean, and model data. We also introduced a new-and-improved version of our official Data Dojo report template, and showcased its built-in shortcuts for fetching Data Warehouse tables from Dataflows in Power BI.

Time for a little backstory: At DMU, we are fortunate enough to have a robust and mature on-premises Data Warehouse which contains just about all of the data generated by the business, spanning several different databases and a dozen or so different schemas. In order to make our data as accessible as possible to report developers throughout the organization, I "mirrored" our Data Warehouse into a series of Power BI Dataflows, and granted our Data Dojo members read-only access to those Dataflows. 

Our latest official Data Dojo report template now ships with a custom Power Query function called `fn_GetTableFromDataflow`, which can be invoked to fetch any table from any Dataflow in Power BI. Here's the code:

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

To import a table from a Dataflow in Power BI, the report author only needs to invoke the `fn_GetTableFromDataflow` function, passing in the name (or GUID) of the Power BI Workspace, the name (or GUID) of the target Dataflow, the name of the table, and the number of rows to retrieve. For example, to import the `FactExamScore` table from the `DataWarehouse` Dataflow in the `DataDojo` Workspace, limiting the results to one million rows for testing purposes, the report author must simply enter those values into the parameter fields in the `fn_GetTableFromDataflow` function's UI and click `Invoke`, and then a new query containing the following M code will be automatically generated:

```fsharp
let
  Source = fn_GetTableFromDataflow(
    "DataDojo", "DataWarehouse", "FactExamScore", 1000000
  )
in
  Source
```

Using this function, report authors can easily import any table from our Data Warehouse into their Power BI report/model, without having to learn how to write SQL or M queries, and without having to worry about future changes to the server name, database name, etc. This is a huge time-saver, significantly lowering the barrier to entry for new report authors, and helping to ensure that all report authors are using the same, standardized, approved version of each table. 

We concluded our 5th workshop by encouraging the participants to continue exploring and experimenting with the `fn_GetTableFromDataflow` function in Power Query, and to start thinking about which tables they'll need to pull into their model in order to build their first report.

{% include aligner.html images="data-dojo/6d05725e-071a-407c-a834-63096ca57e57_cropped.jpg" column="auto" %}
<!-- add image of data ninjas with code -->

# The Importance of Hands-On Workshops

I firmly believe that every Power BI Community of Practice should host at least one interactive, hands-on workshop per quarter, and here are three reasons why:
1. **Slide shows are boring. They're boring to make, and they're often just as boring to watch.** And to make matters worse, slide shows are not even very effective at conveying the complex technical concepts of data analytics, nor the tools and techniques we use to implement them. If we're only hosting lectures, and not giving our members a chance to get their hands dirty, then we're not helping them learn, grow, and develop their skills, and that means we're also not helping our organizations achieve their strategic goals and objectives with regards to data.
2. **Technical concepts and skills are best taught by hands-on, interactive, live demonstration** -- where every participant can follow along, ask questions, and experience firsthand the thrill of discovery and the rush of wielding a powerful tool for the first time. This is especially true for data analytics, which is simultaneously a highly visual discipline, ***and*** requires the ability to think in ***n*-dimensional space** (a concept which defies all attempts at visualization, making it nearly impossible to learn by merely watching).
3. **Following along with a live demonstration is more effective as a learning aid than watching a slide show, and it's also more fun!** And when people are having fun, they're more likely to ask questions, remain engaged during the workshop, retain more of what they learn, tell their coworkers about their experiences, and most importantly, keep coming back for more. By hosting hands-on workshops on a regular basis, we can help our members learn more, learn faster, and have more fun doing it. And that's a win-win-win for everyone involved.

# Next Time: Designing a Versatile, User-Friendly Power BI Template
You've now had a peek under the hood of our official Data Dojo report template, and seen one of its most powerful features -- the `fn_GetTableFromDataflow` function. In the next installment of this series, we'll take a closer look at the latest Data Dojo template, tinker with more of its capabilities, and talk about how to strike the right balance when designing a Power BI template that's both simple enough for a beginner **and** versatile enough for a seasoned pro. Stay tuned!

{% include aligner.html images="data-dojo/data-team-tunnel-matrix-cropped.png" column="auto" %}

## Bonus: Data Dojo featured on Havens Consulting YouTube Channel!
[![Data Dojo featured on Havens Consulting YouTube Channel!](../../../assets/img/data-dojo/data-dojo-havens-consulting-youtube.png)](https://www.youtube.com/watch?v=OlvXbg6VjFE&list=PLzN99cpDw6oBsWZ-5CPVwGZqAQ1otRh1q&t=326s){:target="_blank"}