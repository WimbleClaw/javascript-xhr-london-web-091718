let repositoryList = document.querySelector("#repositories")
let commitList = document.querySelector("#commits")

repositoryList.addEventListener('click', (event) => {
    showcommits(event.target.dataset.repoName)
})

function getData(url) {
    return fetch(url)
        .then(response => response.json())
}

function showRepositories() {
    getData('https://api.github.com/users/octocat/repos')
        .then(data => {
            data.forEach(repository => {
                const repositoryEl = document.createElement("li")
                repositoryEl.dataset.repoName = repository.name
                repositoryEl.innerText = repository.name
                repositoryList.appendChild(repositoryEl)               
            });
        });
        
}

function showcommits(name) {
    commitList.innerText = ""
    getData(`https://api.github.com/repos/octocat/${name}/commits`)
        .then(data => {
            data.forEach(commit => {
                const commitEl = document.createElement("li")
                commitEl.innerText = commit.commit.message
                commitList.appendChild(commitEl)
            })
        })
}