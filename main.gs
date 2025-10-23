function triggerGitHubActionWithInterval() {

  var owner = 'YOUR_GITHUB_USERNAME'; 
  var repo = 'YOUR_OTHER_REPO_NAME'; 
  var pat = 'YOUR_GITHUB_PAT';

  var url = 'https://api.github.com/repos/' + owner + '/' + repo + '/dispatches';
  var payload = { event_type: 'run-weather-tasks' };
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'headers': {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': 'token ' + pat,
      'User-Agent': 'Google-Apps-Script-Scheduler'
    },
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var responseCode = response.getResponseCode();

    if (responseCode === 204) { // 204 No Content is the successful response from GitHub API
      Logger.log('Successfully triggered GitHub Action (event: run-weather-tasks).');
    } else {
      Logger.log('Failed to trigger GitHub Action. Response code: ' + responseCode + '. Body: ' + response.getContentText());
    }
  } catch (e) {
    Logger.log('Error occurred while fetching API: ' + e.toString());
  }
}
