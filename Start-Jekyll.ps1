# Parameters for LiveReload, Incremental, and Init
Param (
  [bool]$LiveReload = $true,
  [switch]$Incremental,
  [switch]$Init,
  [switch]$Published
)

[string]$LiveReloadArg = $LiveReload ? " --livereload" : ""
[string]$IncrementalArg = !!$Incremental ? " --incremental" : ""
[string]$InitArg = !!$Init ? "bundle exec " : ""
[string]$PublishedArg = !!$Published ? "" : " --unpublished"
[string]$commandString = $InitArg + "jekyll serve" + $LiveReloadArg + $IncrementalArg + $PublishedArg

# Print command string
Write-Output "Running command: ""$commandString"""

# Start Jekyll
Invoke-Expression $commandString