---
layout: post
title: "The Data Dojo: A Power BI Community of Practice (Part&nbsp;4)"
summary: Summaries of our 4th and 5th workshops, and why I believe that every Power BI Community of Practice should host workshops like these as often as possible
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
  - Power Query (M)
  - Dataflow
excerpt_start: <!--excerpt-->
excerpt_separator: <!--more-->
draft: false
series: data-dojo
description: A series about founding and fostering a successful Power BI Community of Practice
---

<!-- intro -->
<!--excerpt-->
{% if layout == default %}
This is the fourth installment in a series documenting the challenges, progress, setbacks, and victories of The Data Dojo: A Power BI Community of Practice.  

In this post, I'll tell you about our 4th and 5th workshops (our most important and impactful workshops yet), and I'll explain why I believe that every Power BI Community of Practice should host workshops like these as often as possible.
{% endif %}
<!--more-->

{% include blog/blog_series_overview.liquid series=page.series %}

Thank you for joining us on this adventure!

{% include aligner.html images="data-dojo/73b72522-d039-4f78-89b6-68738189a233_cropped.jpg" column="auto" %}

# Workshop&nbsp;#4: The Data Dojo Strikes Back (Our 1st Hands&#8209;On Workshop)

We hosted our 4th workshop on September 19th, 2023, and it was attended by seventeen members. This was a significant improvement in turnout over our previous workshop, and an encouraging sign that the Data Dojo is finally back on track, healthy, and growing again. We were thrilled to welcome several new members to the Data Dojo for the first time at this workshop, and we're excited to not only help them discover their own unique paths to data literacy and mastery, but also to learn from them as they bring their own unique knowledge, perspectives, and experiences to the table.

This was also an exciting new milestone for us because, unlike any of our previous workshops (which mostly consisted of PowerPoint presentations and Q&A sessions), this was an **actual workshop** -- no slide deck, just a live, interactive tour of Power BI Desktop! Thus, it was our first true "workshop" in the traditional sense of the word.

We started by walking our participants through the process of installing Power BI Desktop from the Microsoft Store and downloading our official Data Dojo report template from our SharePoint site. Then, we opened Power BI Desktop and took a tour of the template, pointing out some of its most useful features and explaining how they work. We also talked about the importance of using a standardized report template, and how it can help us to work together more effectively, by ensuring that all of our reports are consistent, accessible, professional, and easy to use. Next, we pointed out the main UI components of Power BI Desktop (see expandable section below), and briefly explained what each one is used for.

{% include accordion.html
	title_text="A quick tour of the main UI components of Power BI Desktop..."
	title_bold="true"
	description_text='
	<div style="margin-left:1.5em; margin-bottom:2em;">
		<ul>
			<li>Report & Model Editor (Main Window)
				<ul>
					<li>Views
						<ul>
							<li>Report View</li>
							<li>Table View</li>
							<li>Model View</li>
						</ul>
					</li>
					<li>Panes
						<ul>
							<li>Data</li>
							<li>Filter</li>
							<li>Visualization</li>
							<li>Selection</li>
						</ul>
					</li>
					<li>Ribbons
						<ul>
							<li>Home</li>
							<li>Insert</li>
							<li>Modeling</li>
							<li>View</li>
							<li>Optimize</li>
							<li>Help</li>
							<li>External Tools</li>
						</ul>
					</li>
				</ul>
			</li>
			<li>Power Query Editor ("Transform Data" Window)
				<ul>
					<li>Panes
						<ul>
							<li>Queries</li>
							<li>Applied steps</li>
						</ul>
					</li>
					<li>Ribbons
						<ul>
							<li>Home</li>
							<li>Transform</li>
							<li>Add Column</li>
							<li>View</li>
							<li>Tools</li>
							<li>Help</li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	<hr style="width:80%;text-align:center;">
	</div>
	'
%}

Finally, we wrapped up our 4th workshop by thanking our participants and encouraging them to:
- Continue exploring and experimenting with Power BI Desktop and the official Data Dojo report template.
- Ask questions, share their experiences and discoveries, and contribute to the ongoing conversation in our Viva Engage group.
- Prepare for the next workshop by writing down ideas for reports they'd like to start building, as well as any data sources they'll need in order to build those reports.

{% include aligner.html images="data-dojo/masked_cyberpunk_data_manga_dojo_25962e35-2be0-4801-b645-fae50d5411cb.jpg" column="auto" %}

# Workshop&nbsp;#5: The Dao of the Dataflow (Our 2nd Hands&#8209;On Workshop)

On December 5th, 2023, we hosted our 5th workshop, picking up right where we left off last time, and diving deep into Power Query. This was our 2nd hands-on workshop, featuring an interactive walkthrough of the Power Query interface in Power BI Desktop, and a live demonstration of how to retrieve, transform, clean, and model data. We also introduced a new-and-improved version of our official Data Dojo report template, and showcased its built-in shortcuts for importing Data Warehouse tables from our centrally-managed Dataflows in Power BI.

{% include accordion.html 
	title_text="A little backstory about these Dataflows..." 
	title_bold="true" 
	description_text='At DMU, we are fortunate enough to have a robust and mature on-premises Data Warehouse which contains just about all of the data generated by the business, spanning several different databases and a dozen or so different schemas.<br/>In order to make the data in our Data Warehouse as accessible and simple to use as possible for report developers throughout the organization, I "mirrored" our Data Warehouse into a set of Power BI Dataflows (organized by database and schema), and granted our Data Dojo members read-only access to them.'
	description_italic="true" 
%}

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

To import a table from a Dataflow in Power BI, the report author only needs to invoke the `fn_GetTableFromDataflow` function, passing in the name (or ID) of the Power BI Workspace, the name (or ID) of the target Dataflow, the name of the table, and the number of rows to retrieve. For example, to import the `FactExamScore` table from the `DataWarehouse` Dataflow in the `DataDojo` Workspace, limiting the results to one million rows for testing purposes, the report author must simply enter those values into the parameter fields in the `fn_GetTableFromDataflow` function's UI and click `Invoke`, and then a new query containing the following M code will be automatically generated:

```fsharp
let
  Source = fn_GetTableFromDataflow(
    "DataDojo", "DataWarehouse", "FactExamScore", 1000000
  )
in
  Source
```

Armed with the `fn_GetTableFromDataflow` function and our centrally-managed Dataflows, Data Dojo members can easily import any table from our Data Warehouse into their Power BI report/model, without having to learn how to write SQL or M queries, and without having to worry about future changes to the server name, database name, etc. This is a huge time-saver, significantly lowering the barrier to entry for new report authors, and helping to ensure that everyone is using the same, standardized, approved version of each table. 

We concluded our 5th workshop by encouraging our participants to: 
- Continue exploring and experimenting with the `fn_GetTableFromDataflow` function in Power Query.
- Keep writing down ideas for their first report.
- Start researching which Data Warehouse tables they'll need to pull into their model in order to build that report.

{% include aligner.html images="data-dojo/6d05725e-071a-407c-a834-63096ca57e57_cropped.jpg" column="auto" %}
<!-- add image of data ninjas with code -->

# The Importance of Hands-On Workshops

I firmly believe that every Power BI Community of Practice should host interactive, hands-on workshops whenever possible, and here are three solid reasons why:
1. **Slideshows are boring. They're boring to make, and they're often just as boring to watch.** And to make matters worse, slideshows are not even very effective at conveying the complex technical concepts of data analytics, nor the tools and techniques we use to implement them. If we're only hosting lectures, and not giving our members a chance to get their hands dirty, then we're not helping them learn, grow, and develop their skills, and that means we're also not helping our organizations achieve their strategic goals and objectives with regards to data.
2. **Technical concepts and skills are best learned via live, interactive, hands-on demonstration** -- where every participant can follow along, ask questions, and experience firsthand the thrill of discovery and the rush of wielding a powerful tool for the first time. This is especially true for data analytics, which is simultaneously a highly visual discipline, ***and*** requires the ability to think in ***n*-dimensional space** (a concept which defies all attempts at visualization, making it nearly impossible to learn by merely watching).
3. **Following along with a live demonstration is not just more effective as a learning aid than watching a slideshow -- it's also more fun!** And when people are having fun, they're more likely to ask questions, remain engaged during the workshop, retain more of what they learn, tell their coworkers about their experiences, and most importantly, keep coming back for more. By hosting hands-on workshops on a regular basis, we can help our members learn more, learn faster, and have more fun doing it. And that's a win-win-win for everyone involved.

# Next Time: Designing a Versatile, User-Friendly Power BI Report Template
You've now had a peek under the hood of our official Data Dojo report template, and seen one of its most powerful features (the `fn_GetTableFromDataflow` function). In the next installment of this series, we'll take a closer look at the latest Data Dojo template, tinker with more of its capabilities, and talk about how to strike the right balance when designing a Power BI template that's both simple enough for a beginner **and** versatile enough for a seasoned pro. Stay tuned!

{% include blog/blog_series_pager.liquid series=page.series %}

{% include aligner.html images="data-dojo/data-team-tunnel-matrix-cropped.png" column="auto" %}

## Bonus: Data Dojo featured on Havens Consulting YouTube Channel!
[![Data Dojo featured on Havens Consulting YouTube Channel!](../../../assets/img/data-dojo/data-dojo-havens-consulting-youtube.png)](https://www.youtube.com/watch?v=OlvXbg6VjFE&list=PLzN99cpDw6oBsWZ-5CPVwGZqAQ1otRh1q&t=326s){:target="_blank"}