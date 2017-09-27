// Saves options to chrome.storage.sync.
function save_options() {
	var isSecureDomain = document.getElementById('securedDomain').checked,
			managementUIDomainVal = document.getElementById('managementUIDomain').value,
			mAnalyticsDomainVal = document.getElementById('mAnalyticsDomain').value,
			cookieDomainVal = document.getElementById('cookieDomain').value;
	if (managementUIDomainVal && mAnalyticsDomainVal && cookieDomainVal) {
		var item = {};
		item.secureDomain = isSecureDomain;
		item.managementUIDomain = managementUIDomainVal;
		item.mAnalyticsDomain = mAnalyticsDomainVal;
		item.cookieDomain = cookieDomainVal;

		chrome.storage.sync.set(item);
		
		// chrome.storage.sync.set(item, function() {
		// 	// Update status to let user know options were saved.
		// 	var status = document.getElementById('status');
		// 	status.textContent = 'Options saved.';
		// 	setTimeout(function() {
		// 		status.textContent = '';
		// 	}, 1000);
		// });
	}
}

// Restores values and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	chrome.storage.sync.get('secureDomain', function(data){
		document.getElementById('securedDomain').checked = data.secureDomain;
	});
	chrome.storage.sync.get('managementUIDomain', function(data){
		document.getElementById('managementUIDomain').value = data.managementUIDomain;
	});
	chrome.storage.sync.get('mAnalyticsDomain', function(data){
		document.getElementById('mAnalyticsDomain').value = data.mAnalyticsDomain;
	});
	chrome.storage.sync.get('cookieDomain', function(data){
		document.getElementById('cookieDomain').value = data.cookieDomain;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click',save_options);