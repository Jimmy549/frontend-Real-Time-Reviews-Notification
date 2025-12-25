@echo off
echo Setting up Git remote and pushing to GitHub...
echo.
echo Please make sure you have created a repository on GitHub first!
echo.
set /p repo_url="Enter your GitHub repository URL (e.g., https://github.com/username/repo-name.git): "

git remote add origin %repo_url%
git push -u origin main

echo.
echo Done! Your code has been pushed to GitHub.
pause