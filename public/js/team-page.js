const iconGroups = document.getElementsByClassName('.card');
const boxes = document.querySelectorAll('.box');

const boxContent = [
    "Content for Box 1",
    "Content for Box 2",
    "Content for Box 3",
    "Content for Box 4",
    "Content for Box 5",
    "Content for Box 6"
  ];
  
  boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      const content = boxContent[index];
      
      iconGroups.forEach(iconGroup => {
        const icons = iconGroup.querySelectorAll('.icon');
        icons[index].src = 'pokeball_filled.png'; 
      });
      
      document.querySelector('.card-content').textContent = content;
    });
  });