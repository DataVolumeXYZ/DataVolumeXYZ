---
layout: post
title: >
  PbiToolsWatchPS: Extract and save your Power BI Desktop source code with a single click!
author: JamesDBartlett3
date: 2023-03-20 21:00:00 -0500
feature-img: "assets/img/pexels/soundwaves.jpg"
thumbnail: "assets/img/pexels/pbitoolswatchps_externaltoolsribbon.png"
tags: [Power BI, External Tools, PowerShell]
excerpt_separator: <!--more-->
---

Many of you have probably heard of [pbi-tools](https://pbi.tools) (by [Mathias Thierbach](https://github.com/mthierba)). It's a powerful command line application which can extract the source code from a Power BI Desktop (.pbix) file and save it in a folder as .json files. This is great for folks who want to save and track their changes to Power BI reports and datasets in a proper version control system, such as Git. 

However, because pbi-tools is a command line application, it must be run from a terminal window (like CMD or PowerShell). <!--more--> This is probably not a deterrent for those who are comfortable with the command line, but it can be a bit intimidating for those who are not. So I created a simple External Tool for Power BI Desktop that launches pbi-tools in a new PowerShell window with a single click of a button: **PbiToolsWatchPS**

## What is PbiToolsWatchPS, and how does it work?

PbiToolsWatchPS is an External Tool for Power BI Desktop which launches a PowerShell window running pbi-tools in Watch Mode on the current file. It essentially tells pbi-tools to start watching the .pbix file you're currently working on, and when pbi-tools detects that you've saved the file, it will extract the "source code" from that file and save it as .json files in an adjacent folder with the same name as the .pbix file. 

For example, if you have a .pbix file called "MyReport.pbix" inside a folder called "C:\MyFolder\\", pbi-tools will create a folder called "C:\MyFolder\MyReport\\" and save the .json files there. If you then make some more changes to your report and save it again, pbi-tools will update the .json files in the "C:\MyFolder\MyReport\\" folder.

## Wait, why should I even use pbi-tools in the first place?

#### If you use pbi-tools to extract and save your Power BI Desktop source code in version control, you'll be able to:
  1. Inspect all of the changes made to your Power BI reports and datasets over time (who changed what, where, when, and why)
  2. Merge changes from two or more developers working on the same file
  3. Make changes directly in the .json source code and use pbi-tools to recompile the source code into a new Power BI Desktop file
  4. Automate the process of testing your reports and datasets in a CI/CD pipeline
  5. And so much more — the possibilities are nearly limitless!

## Why should I use PbiToolsWatchPS to launch pbi-tools instead of just running it from the command line?

* If you're not comfortable with the command line, then PbiToolsWatchPS is a great way to start using pbi-tools without having to learn how to use the command line first.
* Even if you are already a command line ninja, you should _still_ consider using PbiToolsWatchPS because:
  * Launching pbi-tools directly from Power BI Desktop with PbiToolsWatchPS is *much* faster than running it manually from the command line.
  * You won't have to remember the pbi-tools command line syntax, which arguments to use, how to use them, etc.
  * You won't have to worry about accidentally running pbi-tools on the wrong .pbix file.
  * Using PbiToolsWatchPS, you can standardize the way everyone in your team runs pbi-tools, thereby ensuring that everyone's changes to the source code are always saved in the same format and folder structure.

In short, PbiToolsWatchPS will always run pbi-tools in Watch Mode on whatever .pbix file you're currently working on, it will always save the .json files in exactly the same format and location, and it will do so more quickly and reliably than running it manually from the command line. What's not to like? 😎

## How do I install PbiToolsWatchPS?

1. Download and extract the latest release of [pbi-tools](https://pbi.tools), then [add the location of pbi-tools.exe to your PATH environment variable](https://pbi.tools/tutorials/getting-started-cli.html#4-optionally-add-the-tool-folder-to-your-path-environment-setting).
2. Download [046-PbiToolsWatchPS5.1.pbitool.json](https://raw.githubusercontent.com/JamesDBartlett3/PowerBits/main/ExternalTools/046-PbiToolsWatchPS5.1.pbitool.json) (from my [PowerBits repo on GitHub](https://github.com/JamesDBartlett3/PowerBits)) and save it in "C:\Program Files (x86)\Common Files\Microsoft Shared\Power BI Desktop\External Tools\\"
3. If Power BI Desktop is already running, restart it
4. In Power BI Desktop, open the "External Tools" ribbon tab, and you should see a new button labeled "pbi-tools: Watch"

{% include aligner.html images="pexels/pbitoolswatchps_externaltoolsribbon.png" column="auto" %}

## How do I use PbiToolsWatchPS?

1. Open a .pbix file in Power BI Desktop. 
2. From the "External Tools" ribbon tab in Power BI Desktop, click the button labeled "pbi-tools: Watch"
3. You should see a Windows PowerShell window open up and start running pbi-tools in Watch Mode. 
  * _**Note: You must leave this PowerShell window open for now. You can minimize it if you want, but *DO NOT* close it yet.**_
4. Make some changes to your .pbix file and save it. In the PowerShell window, you'll see the output from pbi-tools as it extracts the .json files from your .pbix file.
5. There should now be a new folder in the same folder as your .pbix file, with the same name as your .pbix file, and it should contain the .json files that were extracted from your .pbix file.
6. Make some more changes to your .pbix file, save it again, and pbi-tools will update the .json files accordingly.
7. When you're finished working on your .pbix file, make sure to save your changes one last time, wait for pbi-tools to finish extracting the .json files, then close Power BI Desktop and the PowerShell window. 
  * _**Warning: Always wait for pbi-tools to finish extracting and saving your latest changes before closing PowerShell or Power BI Desktop, otherwise you may end up with incomplete and/or corrupted .json files.**_
8. In your Git repository, stage all of the files you've changed, add a commit message describing the changes you made, then commit and push to your remote/origin repository.

## Notes

* Extracting the contents of Power BI Desktop files is **strictly NOT supported by Microsoft**. If you use PbiToolsWatchPS, pbi-tools, or any other tools that modify the contents of your Power BI Desktop files, and something goes sideways, **Microsoft will NOT help you**, so make sure to keep plenty of backups!
* By default, Windows file paths have a maximum length of 260 characters, so if your .pbix files are saved in a folder with a long path, pbi-tools may start throwing error messages saying that it can't save the .json files it has extracted, because their paths would be too long. If this happens, you can try: 
  * Moving your .pbix files to a folder with a shorter path (relatively simple, but may not solve the problem, or only solve it temporarily)
  * Applying the [LongPathsEnabled](https://docs.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation?tabs=cmd#enable-long-paths-in-windows-10-version-1607-and-later) registry fix on your machine (more complicated, but very likely to solve the problem permanently)
* The version of PbiToolsWatchPS linked above runs in Windows PowerShell 5.1. If you prefer PowerShell Core 7+, you can download and install [046-PbiToolsWatchPS7.pbitool.json](https://raw.githubusercontent.com/JamesDBartlett3/PowerBits/main/ExternalTools/046-PbiToolsWatchPS7.pbitool.json) instead, though that version is not well tested, and may not work properly (or at all).
