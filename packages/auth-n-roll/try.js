const  sprintf  = require('sprintf-js').sprintf
var user = {
  name: "Dolly"
}

console.log(sprintf("user %(name)s", user))
console.log(sprintf("Hello %(name)s", user))
