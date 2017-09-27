var webRequests = [];
var isSecure = false;

function changeBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

document.addEventListener('DOMContentLoaded', () => {
  var dropdown = document.getElementById('dropdown');
  // Ensure the background color is changed and saved when the dropdown
  // selection changes.
  dropdown.addEventListener('change', () => {
    changeBackgroundColor(dropdown.value);
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // every tab action listener
  document.body.style.backgroundColor = "green";
	chrome.storage.sync.get('secureDomain', function(data){
		isSecure = data.secureDomain;
	});
}); 


// all http requests
var filter;
if(isSecure) {
  filter = {urls: ["https://*/"]};
} else {
  filter = {urls: ["http://*/"]};
}
var callback = function(details) {
  var webRequestsElement = document.getElementById('webRequests');
  var webRequestsElementBody = webRequestsElement.createTBody();
  if (details) {
    var tr = webRequestsElementBody.insertRow(0);
    for (item in details) {
      if(details.hasOwnProperty(item)){
        var td = tr.insertCell(Object.keys(details).indexOf(item));
        td.innerHTML = details[item];
      }
    }
  }
};

var opt_extraInfoSpec = [];

chrome.webRequest.onBeforeRequest.addListener(callback, filter, opt_extraInfoSpec);
