# Captcha Generator

HTML5 & Javascript captcha generator using a HTML canvas to produce the captcha on the frontend. 

To implement, just add the script at the end of the body of the page you intend to use it on and then
just drop the following tag into your HTML.

```html
<captcha></captcha>
```

If successful you should see the captcha window rendered - see example below.

![alt text](./Example/screenshot.png "Captcha example")

You can check to see whether the captcha has been successful by looking for the 'captcha' cookie - this
is set to expire after 1 minute.

### Future Improvements
- Fix character rotation so they can be rotated more than 5% on the canvas
- Create more secure method of the client checking that the captcha was successful
- Refactor the canvas code into a nice class