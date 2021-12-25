import { GenerateComponent } from './component'

const
    prefix = 'app',
    args = process.argv

if(args.length == 2) console.error("Need more arrangements.")
else if(args[2] != 'g') console.error("Just generate arrangement can pass.");
else if(args[3] != 'c') console.error("Just generate component arrangement can pass.");
else if(args[4].length == 0) console.error("Component need a name.");
else GenerateComponent(prefix, args[4])