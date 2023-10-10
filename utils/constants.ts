export const mod = 3.2;

export const skew = (dir:boolean, x:number,y:number) => (!dir ? `-skew-x-[${x}deg] -skew-y-[${y}deg] md:skew-x-[${x}deg] md:skew-y-[${y}deg]` : `skew-x-[${x}deg] skew-y-[${y}deg] md:-skew-x-[${x}deg] md:-skew-y-[${y}deg]`);
