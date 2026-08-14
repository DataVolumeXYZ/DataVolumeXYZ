# Parameters for LiveReload, Incremental, and Init
Param (
  [bool]$LiveReload = $false,
  [switch]$Incremental,
  [switch]$Init,
  [switch]$Published
)

if ($Init) {
  bundle install
  if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
  }
}

$bundleArgs = @("exec", "jekyll", "serve")
if ($LiveReload) {
  $bundleArgs += "--livereload"
}
if ($Incremental) {
  $bundleArgs += "--incremental"
}
if (-not $Published) {
  $bundleArgs += "--unpublished"
}

[string]$commandString = "bundle " + ($bundleArgs -join " ")

# Print command string
Write-Output "Running command: ""$commandString"""

# Start Jekyll
& bundle @bundleArgs
exit $LASTEXITCODE