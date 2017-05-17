import {Pipe} from "@angular/core";

/**
 * A simple string filter, since ng2 does not yet have a filter pipe built in.
 */
@Pipe({
    name: 'stringFilter'
})
export class StringFilterPipe {

    transform(value: dataPoints[], q: string) {
        if (!q || q === '' || q === 'All') {
            return value;
        }        
        return value.filter(item => item.name.toString().toLowerCase().indexOf(q.toLowerCase())===0);
        //return value.filter(item => -1 < item.name.toString().toLowerCase().indexOf(q.toLowerCase()));
    }
}

class dataPoints{
    public name: string;
    public email: string;
    public regDate: string;
    public city: string;    
    public age: number;
}