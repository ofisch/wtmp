console.log('Hello console!');

const a = 6;
let b = 3;
{
    const a = 9;
    const c = 3;
    {
        let c = 1;
        console.log(a + b+ c);
        b = 2;
    }
    console.log(a + b);
}
console.log(a+ b);