export const API_KEY = 'AIzaSyBXIUZ0NlBqLZ5Bd6dSPEHX5axOWnh_blE'


export const value_converter = (value) =>{
    if (value>=1000000) {
        return Math.floor(value/1000000)+"M";
    }
    else if (value>=1000) {
        return Math.floor(value/1000)+"K";
    }
    else{
        return value;
    }
}