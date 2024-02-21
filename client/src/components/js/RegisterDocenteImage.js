const imgDiv = document.querySelector('.userImg');
const img = document.querySelector('#photo');
const file = document.querySelector('input[name="image"]')
const uploadebtn = document.querySelector('#uploadbtn');

file.addEventListener( 'change' , function(){
    const chosedfile = this.files[0];
    if(chosedfile){

        const reader =  new FileReader();

        reader.addEventListener( 'load' , function(){
            img.setAttribute( 'src', reader.result);
        })

        reader.readAsDataURL(chosedfile);

    }
})
