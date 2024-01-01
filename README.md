## Pokemon Team Builder 

A simple app to help you see what types your team is comprised of. Choose any six pokemon using the left side UI. Once you select six pokemon the different types that they are comprised of will appear. 

API used: https://pokeapi.co/api/v2/pokemon 

[Wireframe of 'main' application screen](https://i.imgur.com/ymGelkh.png)

![Screenshot](./Photos/pic1.png?raw=true)

![Screenshot](./Photos/pic2.png?raw=true)

### Technologies Used: 
- JavaScript 
- HTML5
- CSS 
- JQuery 

### Approach: 
- Create a basic CSS layout that complements the apps functionality, with the UI taking up 1/4 on the left hand side and the main display taking up 3/4 of the screen 
- Used the Pokemon API to request data on the different pokemon 
- Created JavaScript that allowed the user to click on the list of pokemon name and diplayed the appropriate photo
- Implimented previous and next buttons so the user could scroll through the entire list
- Saved the type information into an array to be called when the user has selected six pokemon 

### Future Implementations: 
- Add a delete button to remove certain pokemon from your team 
- Remove repeated types when there is more than one member of the team with the same type
- Show what types your team is weak too 
- Add a search bar so you can select pokemon using both the list and search
