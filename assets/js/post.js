// Copy code to clipboard button
var codeBlocks = document.querySelectorAll("pre.highlight");
codeBlocks.forEach(function (codeBlock) {
  var copyButton = document.createElement("button");
  copyButton.className = "copy";
  copyButton.type = "button";
  copyButton.ariaLabel = "Copy code to clipboard";
  copyButton.innerText = "Copy";
  codeBlock.append(copyButton);
  copyButton.addEventListener("click", function () {
    var code = codeBlock.querySelector("code").innerText.trim();
    window.navigator.clipboard.writeText(code);
    copyButton.innerText = "Copied";
    var fourSeconds = 4000;
    setTimeout(function () {
      copyButton.innerText = "Copy";
    }, fourSeconds);
  });
});

// Progress bar
document.addEventListener("DOMContentLoaded", function () {
	var progressBar = document.querySelector(".progress")
	var postContent = document.querySelector(".post-content")
	var detailsExpanders = document.querySelectorAll("details.expander")
	var documentHeight = Math.max(
		document.documentElement.clientHeight,
		document.documentElement.scrollHeight,
		document.documentElement.offsetHeight,
		document.body.scrollHeight,
		document.body.offsetHeight
	)
	var postContentHeight = postContent.scrollHeight
	var bannerHeight = document.querySelector("#main").scrollHeight
	var siteHeaderHeight = document.querySelector(".site-header").scrollHeight
	var seriesOverviewHeight = document.querySelector(".series-overview").scrollHeight + 0
	var topOffset = seriesOverviewHeight + siteHeaderHeight + bannerHeight
	var bottomOffset = documentHeight - postContentHeight - seriesOverviewHeight - siteHeaderHeight - bannerHeight

	function progressShow() {
		if (window.scrollY < topOffset) {
			progressBar.classList.remove("progress--visible");
			progressBar.classList.add("progress--hidden");
		} else {
			progressBar.classList.remove("progress--hidden");
			progressBar.classList.add("progress--visible");
		}
	}

	function progressbarScroll() {
		var detailsExpandersCount = detailsExpanders.length
		var detailsExpanderHeight = 0
		for (var i = 0; i < detailsExpandersCount; i++) {
			detailsExpanderHeight += detailsExpanders[i].scrollHeight
		}
		var totalScroll = ((window.scrollY - topOffset) / (postContentHeight - bottomOffset - window.innerHeight - topOffset + detailsExpanderHeight)) * 100;
		document.querySelector(".progress__bar").style.width = totalScroll + "%";
	}

	progressShow();
	progressbarScroll();

	window.addEventListener("scroll", function () {
		progressShow();
		progressbarScroll();
	});
});
