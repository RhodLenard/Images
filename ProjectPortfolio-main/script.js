document.addEventListener('DOMContentLoaded', function() {
fetchProjects()
});

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");


function openTab(tabname){
  for(tablink of tablinks){
      tablink.classList.remove("active-link");
  }
  for(tablink of tabcontents){
      tablink.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

  const scriptURL = 'https://script.google.com/macros/s/AKfycbx0e9G8Cce3l8HExOFol2oehXR3aLWYbrBJxGjWr_6fBc7pPSNrfgh_6QUxaudNiN0O/exec'
  const form = document.forms['submit-to-google-sheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML = "Message sent successfully"
        setTimeout(function(){
          msg.innerHTML = ""
        },5000)
        form.reset()
      })
      .catch(error => console.error('Error!', error.message))
  })

  function addProjectToTable(project) {
    const projectTable = document.getElementById("projectTable")
    const projectnode = document.createElement("div");
    projectnode.innerHTML = `<div class="work">
    <img src="https://raw.githubusercontent.com/RhodLenard/Images/ebb367a026f03e5ada2240c755a6348f1ed4bff7/work1.jpeg" alt="work1">
    <div class="layer">
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <a href="soon.html" target="_blank"><i class="fa-solid fa-up-right-from-square"></i></a>
    </div>
  </div>
    `;
    projectTable.appendChild(projectnode)
    
    // const newRow = projectTable.appendChild();
    // Attach event listeners for the new buttons
    
  }

  async function fetchProjects() {
    try {
      const response = await fetch('https://api-azvo.onrender.com/projects');
      const projects = await response.json();
      projects.forEach(project => addProjectToTable(project));
      console.log(projects)
    } catch (error) {
      console.error('Error fetching projects:', error);

    }
  }
