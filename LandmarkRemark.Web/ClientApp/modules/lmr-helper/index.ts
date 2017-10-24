import { Injectable, Inject } from '@angular/core';

@Injectable()
export class LmrHelper{
    constructor() { }

    public serialize(obj) {
        if (obj) {
            var str = [];
            for (var p in obj)
                if (obj.hasOwnProperty(p)) {
                    var n = (encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])) as never;
                    str.push(n);
                }
            return str.join("&");
        }
        return "";
    }
    public toCamelCase(obj: any) {
        var key, keys = Object.keys(obj);
        var n = keys.length;
        var newobj = {}
        while (n--) {
            key = keys[n];
            newobj[key.toLowerCase()] = obj[key];
        }
        return newobj;
    }
    public serializeRecursive(obj, prefix) {
        if (obj) {
            var str = [], p;
            for (p in obj) {
                if (obj.hasOwnProperty(p)) {
                    var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                    var n = ((v !== null && typeof v === "object") ?
                        this.serializeRecursive(v, k) :
                        encodeURIComponent(k) + "=" + encodeURIComponent(v)) as never;
                    str.push(n);
                }
            }
            return str.join("&");
        }
        return "";
    }    

    public extend<A>(a: A): A;
    public extend<A, B>(a: A, b: B): A & B;
    public extend<A, B, C>(a: A, b: B, c: C): A & B & C;
    public extend<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
    public extend(...args: any[]): any {
        const newObj = {};
        for (const obj of args) {
            for (const key in obj) {
                //copy all the fields
                newObj[key] = obj[key];
            }
        }
        return newObj;
    };
}



