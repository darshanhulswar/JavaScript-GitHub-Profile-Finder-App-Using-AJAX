const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const gitHubCard = document.getElementById('github-card')

const githubCard = {
    name: document.getElementById('github-username'),
    profileImage: document.getElementById('github-profile'),
    profileLink: document.getElementById('github-profile-link'),
    followers: document.getElementById('github-followers'),
    following: document.getElementById('github-following'),
    gist: document.getElementById('github-gist'),
    bio: document.getElementById('github-bio'),
    portfolio: document.getElementById('github-portfolio'),
    followersCount: document.getElementById('github-followers-count'),
    followingCount: document.getElementById('github-following-count'),
    publicRepos: document.getElementById('github-public-repos'),
    publicGists: document.getElementById('github-public-gists'),
}

searchBtn.addEventListener('click', () => {
    const searchInputText = searchInput.value
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', (searchInputText) => {
        if (xhr.readyState === 4 && xhr.status === 200) {

            if (gitHubCard.classList.contains('d-none')) {
                gitHubCard.classList.remove('d-none')
            }

            const data = JSON.parse(xhr.responseText)
            console.log(data)

            githubCard.name.innerHTML = data.login
            githubCard.profileImage.src = data.avatar_url
            githubCard.profileLink.href = data.html_url
            githubCard.profileLink.innerText = data.login
            githubCard.gist.href = `https://gist.github.com/${data.login}`
            githubCard.bio.innerText = data.bio
            githubCard.portfolio.href = `https://${data.blog}`
            githubCard.portfolio.innerText = data.name
            githubCard.followers.href = `https://github.com/${data.login}?tab=followers`
            githubCard.followersCount.innerText = data.followers
            githubCard.following.href = `https://github.com/${data.login}?tab=following`
            githubCard.followingCount.innerText = data.following
            githubCard.publicRepos.innerText = data.public_repos
            githubCard.publicGists.innerText = data.public_gists


        }
    })

    xhr.open('GET', 'https://api.github.com/users/' + searchInputText, true)
    xhr.send()
})