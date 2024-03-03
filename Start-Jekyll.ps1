# Parameters for LiveReload, Incremental, and Init
Param (
  [bool]$LiveReload = $true,
  [switch]$Incremental,
  [switch]$Init
)

[string]$LiveReloadArg = $LiveReload ? " --livereload" : ""
[string]$IncrementalArg = !!$Incremental ? " --incremental" : ""
[string]$InitArg = !!$Init ? "bundle exec " : ""
[string]$commandString = $InitArg + "jekyll serve" ` + $LiveReloadArg + $IncrementalArg

# Print command string
Write-Output "Running command: ""$commandString"""

# Start Jekyll
Invoke-Expression $commandString