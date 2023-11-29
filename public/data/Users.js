export let myEvents=JSON.parse(localStorage.getItem('Users'))
if (!Users){
    Users=
    [
        {
            username:'assafassa',
            passwords:'',
        },
        {
            username:'lielbenshmuel',
            password:'',
        },
    ]
}