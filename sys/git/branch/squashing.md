---
title: Squashing
nav: squashing
---

To **squash** in Git means to combine multiple commits into one.

## chatgpt


> Yes, you can merge a couple of revisions into one revision using Git. This is called squashing commits, and it can help you keep your commit history clean and organized. There are different ways to squash commits, but one of the most common ones is using the interactive rebase feature of Git. You can use the command git rebase -i <after-this-commit> to open a text editor where you can choose which commits you want to squash. You can replace “pick” with “squash” or “fixup” for each commit you want to squash, and then save and exit the editor. Git will then combine the selected commits into one, and prompt you to edit the commit message. You can also use the command git reset --soft <after-this-commit> to move the HEAD pointer to a previous commit, and then use git commit to create a new commit that includes all the changes from the squashed commits. For more information on how to squash commits, you can read these articles:
* [How to Squash Commits in Git](https://www.git-tower.com/learn/git/faq/git-squash/)
* [How to squash and merge commits in a git repository](https://levelup.gitconnected.com/how-to-squash-and-merge-commits-in-a-git-repository-f1ceed0479c7)
* [How do I squash my last N commits together](https://stackoverflow.com/questions/5189560/how-do-i-squash-my-last-n-commits-together)?.

## Use Cases

* squashing last 6 commits
  ```sh
  git rebase -i HEAD~6
  ```