const toggleTheme = document.getElementById('toggle-theme');
const toggleIcon = document.getElementById('toggle-icon');
const toggleText = document.getElementById('toggle-text');

const toggleColors = document.getElementById("toggle-colors");

const rootStyles = document.documentElement.style;
toggleTheme.addEventListener('click', ()=>{
    document.body.classList.toggle("dark");
    if(toggleIcon.src.includes('luna.ico')){
        toggleIcon.src='assets/icon/sol.ico'
        toggleText.textContent='Light Mode'
    }else{
        toggleIcon.src="assets/icon/luna.ico";
        toggleText.textContent="Dark Mode";
    }
});

toggleColors.addEventListener("click", (e)=>{
    rootStyles.setProperty ('--primary-color', e.target.dataset.color);
    
});