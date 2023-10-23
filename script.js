const terminalInput = document.querySelector("input");
const terminalOutput = document.querySelector("#terminal-command");
const workingDirectory = document.querySelector("#working-directory");
const stagingArea = document.querySelector("#staging-area");
const localRepo = document.querySelector("#local-repo");

let init = false;

const handleTerminalInput = (command) => {
  cmd = command.split(" ");

  let enteredCmd = document.createElement("div");
  enteredCmd.innerHTML = `computer:~$ ${command}`;
  terminalOutput.appendChild(enteredCmd);

  if (cmd[0] == "touch") {
    if (cmd.length > 1) {
      for (let filename of cmd.slice(1, cmd.length)) {
        let newfile = document.createElement("div");
        newfile.innerHTML = filename;
        newfile.classList.add("bg-gray-300");
        newfile.classList.add("p-2");
        newfile.classList.add("rounded-lg");
        newfile.classList.add("text-center");
        newfile.setAttribute("id", "newfile");
        workingDirectory.appendChild(newfile);
      }
    }

    console.log("file is created", cmd[1]);
  } else if (cmd[0] == "git") {
    if (cmd[1] == "init") {
      stagingArea.classList.remove("hidden");
      localRepo.classList.remove("hidden");
      document.querySelector("#local-repocontainer").classList.remove("hidden");
      init = true;
      enteredCmd.innerHTML = `computer:~$ Initialized empty Git repository`;
      terminalOutput.appendChild(enteredCmd);
    } else if (cmd[1] == "status" && init) {
      let workingDirectoryFiles = workingDirectory.querySelectorAll("#newfile");
      let stagedFiles = stagingArea.querySelectorAll("#stagedfile");
      if (workingDirectoryFiles.length == stagedFiles.length) {
        enteredCmd.innerHTML = `computer:~$ nothing to be staged`;
        terminalOutput.appendChild(enteredCmd);
      } else {
        enteredCmd.innerHTML = `computer:~$ untracked files`;
        terminalOutput.appendChild(enteredCmd);
      }
    } else if (cmd[1] == "add") {
      if (cmd[2] == ".") {
        let files = workingDirectory.querySelectorAll("#newfile");
        let stagedFiles = stagingArea.querySelectorAll("#stagedfile");
        if (stagedFiles.length == 0) {
          for (let file of files) {
            console.log("ADD");
            let stagingFile = document.createElement("div");
            stagingFile.innerHTML = file.innerHTML;
            stagingFile.classList.add("bg-gray-300");
            stagingFile.classList.add("p-2");
            stagingFile.classList.add("rounded-lg");
            stagingFile.classList.add("text-center");
            stagingFile.setAttribute("id", "stagedfile");
            stagingArea.appendChild(stagingFile);
          }
        } else {
          let exist = false;
          for (let file of files) {
            exist = false;
            for (let stagedFile of stagedFiles) {
              if (file.innerHTML === stagedFile.innerHTML) {
                exist = true;
                console.log(file.innerHTML, stagedFile.innerHTML);
              }
            }
            if (exist) {
              continue;
            } else {
              console.log("ADD");
              let stagingFile = document.createElement("div");
              stagingFile.innerHTML = file.innerHTML;
              stagingFile.classList.add("bg-gray-300");
              stagingFile.classList.add("p-2");
              stagingFile.classList.add("rounded-lg");
              stagingFile.classList.add("text-center");
              stagingFile.setAttribute("id", "stagedfile");
              stagingArea.appendChild(stagingFile);
            }
          }
        }
      } else {
        let files = workingDirectory.querySelectorAll("#newfile");
        for (let file of files) {
          if (cmd[2] == file.innerHTML) {
            let stagingFile = document.createElement("div");
            stagingFile.innerHTML = file.innerHTML;
            stagingFile.classList.add("bg-gray-300");
            stagingFile.classList.add("p-2");
            stagingFile.classList.add("rounded-lg");
            stagingFile.classList.add("text-center");
            stagingFile.setAttribute("id", "stagedfile");
            stagingArea.appendChild(stagingFile);
          }
        }
      }
    } else if (cmd[1] == "commit") {
      // let commitedFiles = localRepo.querySelectorAll('#commitfile')
      // let stagedFiles = stagingArea.querySelectorAll('#stagedfile')

      // if(commitedFiles.length!=0){
      //     for(let commitedFile of commitedFiles){
      //         localRepo.removeCild(commitedFile)
      //     }

      // }

      let files = stagingArea.querySelectorAll("#stagedfile");
      let commitedFiles = localRepo.querySelectorAll("#commitedfile");
      if (commitedFiles.length == 0) {
        for (let file of files) {
          console.log("ADD");
          let commitingFile = document.createElement("div");
          commitingFile.innerHTML = file.innerHTML;
          commitingFile.classList.add("bg-gray-300");
          commitingFile.classList.add("p-2");
          commitingFile.classList.add("rounded-lg");
          commitingFile.classList.add("text-center");
          commitingFile.setAttribute("id", "commitedfile");
          localRepo.appendChild(commitingFile);
        }
      } else {
        let exist = false;
        for (let file of files) {
          exist = false;
          for (let commitedFile of commitedFiles) {
            if (file.innerHTML === commitedFile.innerHTML) {
              exist = true;
            }
          }
          if (exist) {
            continue;
          } else {
            console.log("ADD");
            let commitingFile = document.createElement("div");
            commitingFile.innerHTML = file.innerHTML;
            commitingFile.classList.add("bg-gray-300");
            commitingFile.classList.add("p-2");
            commitingFile.classList.add("rounded-lg");
            commitingFile.classList.add("text-center");
            commitingFile.setAttribute("id", "commitedfile");
            localRepo.appendChild(commitingFile);
          }
        }
      }

      // for(let file of stagedFiles){
      //             console.log('ADD')
      //             let commmitedFile = document.createElement('div')
      //             commmitedFile.innerHTML=file.innerHTML
      //             commmitedFile.classList.add('bg-gray-300')
      //             commmitedFile.classList.add('p-2')
      //             commmitedFile.classList.add('rounded-lg')
      //             commmitedFile.classList.add('text-center')
      //             commmitedFile.setAttribute("id", "stagedfile");
      //             localRepo.appendChild(commmitedFile)
      // }
    }
  }

  console.log(command);
};

terminalInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    handleTerminalInput(terminalInput.value);
    terminalInput.value = "";
  }
});
