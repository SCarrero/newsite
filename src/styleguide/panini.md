<title class="hide">Styleguide: Panini</title><br>

# Panini 

If you've ever created a static site, maybe you had five pages that all shared the same header and footer. You create your first page, and then copy and paste the common elements to the next page. But now if you need to make a change to the header, the change has to be made across multiple files.

Panini is a flat file compiler that uses the concepts of templates, pages, and partials&mdash;powered by the [Handlebars](http://handlebarsjs.com/) templating language&mdash;to streamline the process of creating static prototypes.



# Templating Basics

A **template** is a common layout that every page in your design shares. It's possible to have multiple templates, but generally you'll only need one, and a page can only use one template. In the prototyping template, the default layout is found under `src/layouts/default.html`.

Here's what a basic template might look like:

```handlebars
<html>
  <head>
    <title>Definitely a Website!</title>
  </head>
  <body>
    <header class="header"><!-- ... --></header>
    {{> body}}
    <footer class="footer"><!-- ... --></footer>
  </body>
</html>
```

In the middle of the HTML is a bit of Handlebars code: `{{> body}}`. This is where the pages you write are injected when Panini runs, giving you a series of complete HTML files at the end.

The **pages** make up the guts of your layouts. These files will just have the middle section of the design, since the layout already covers the top and bottom. The prototyping template includes one blank page to get you started, under `src/pages/index.html`.

A basic page might look like this:

```html
<h1>Page Title</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium ducimus eligendi, reiciendis corporis quam facere quaerat qui, aspernatur molestiae velit, vero ea quisquam laborum corrupti repudiandae totam, at aliquam esse.</p>
```

Note that there's no `<html>` or `<body>` tags, and no header or footer. This code will be injected into the `{{> body}}` declaration when Panini assembles your pages.

In the prototyping template, these finished files are compiled into a standalone folder called `dist` (short for "distribution"), which also includes your processed CSS, JavaScript, and images. This folder can easily be uploaded to any web server.



## Partials

Partials are a feature of Handlebars which allow you to inject HTML anywhere in a page or layout. They're really useful when you need to repeat certain chunks of code throughout your pages, or to keep individual files from getting too cluttered with HTML.

Here's an example of a layout file that divides its key sections into partials:

```handlebars
<html>
  <head>
    <title>Definitely STILL a Website!</title>
  </head>
  <body>
    {{> header}}
    {{> navigation}}
    {{> body}}
    {{> footer}}
  </body>
</html>
```

The `{{> }}` syntax tells Handlebars to look for an HTML file with that name, and inject it at that place. In this example, we have files called `header.html`, `navigation.html`, and `footer.html`. In the prototyping template, these files all exist within `src/partials`.



# Page Variables

Pages have a few built-in variables, which can be used within the page template itself, or within a layout or partial being used in tandem with the page.

## page

Prints the name of the current page, without its original file extension. In the below example, if the page is `index.html`, `{{page}}` will become `index`.

```handlebars
<p>You are here: {{page}}</p>
```

## root

Use `{{root}}` before a file path to make sure it works no matter what folder the current page is in.

For example, a path to an external CSS file will need to be different if the current page is at the root level of your site, or in a sub-folder.

Here's how you'd use it with a `<link>` tag:

```handlebars
<link rel="stylesheet" href="{{root}}assets/css/app.css">
```

If the page is `index.html`, the path will look like this:

```html
<link rel="stylesheet" href="assets/css/app.css">
```

If the page is `folder/page.html`, the path will look like this:

```html
<link rel="stylesheet" href="../assets/css/app.css">
```

The `../` is added only on pages in a sub-folder, so the CSS can still be properly loaded.



# Helpers

Helpers are special functions that manipulate content on the page. Panini includes Handlebars's built-in helpers, additional Panini helpers, and allows you to create your own.

## Handlebars Helpers

Learn about the [Handlebars's built-in helpers](https://handlebarsjs.com/guide/builtin-helpers.html#if) including `#if`, `#unless`, `#each` `#with`, `lookup`, and `log`.

## Panini Helpers

Panini adds additional helpers, some of which work with [Panini's page variables](#page-variables). 

### ifequal

Displays the HTML inside the helper if the two values are equal. 

```handlebars
{{#ifequal foo bar}}
  <p>foo and bar are equal</p>
{{/ifequal}}
```

### ifpage

Displays the HTML inside the helper only on specific pages. In the below example, the HTML inside the helper will only show up on the `index.html` page.

```handlebars
{{#ifpage 'index'}}
  <p>This is definitely the Index page.</p>
{{/ifpage}}
```

You can also check for multiple pages. If *any* name in the list matches the current page, the HTML will appear.

```handlebars
{{#ifpage 'index' 'about'}}
  <p>This is definitely either the Index or About page.</p>
{{/ifpage}}
```

### unlesspage

The opposite of `#ifpage`, `#unlesspage` will only display the HTML inside of it if the current page is *not* in the parameters.

```handlebars
{{#unlesspage 'index'}}
  <p>This is definitely <em>not</em> the Index page.</p>
{{/unlesspage}}
```

### repeat

Repeats the content inside of it `n` number of times. Use this to easily print lots of duplicate HTML in a prototype.

```handlebars
<ul>
  {{#repeat 5}}
  <li>Five hundred ninety-nine US dollars</li>
  {{/repeat}}
</ul>
```

### markdown

Converts Markdown into HTML.

```handlebars
{{#markdown}}
# Heading 1
Lorem ipsum [dolor sit amet](http://html5zombo.com), consectetur adipisicing elit. Nam dolor, perferendis. Mollitia aut dolorum, est amet libero eos ad facere pariatur, ullam dolorem similique fugit, debitis impedit, eligendi officiis dolores.
{{/markdown}}
```

### code

Handlebars block helper that returns The HTML inside the helper, with highlight.js classes added.  If using this outside of a styleguide page, be sure to include a link to [the css](//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/github.min.css) for the color coding to work.

Code format options include html, js, css, scss, json, perl, xml, markdown, handlebars.
```handlebars
{{#code 'html'}}
<a class="button">Button!</a>
{{/code}}
```

## Custom Helpers

We have extended Panini with many helpers already, but if you don't see the right helper, you can write your own. Add a javascript file to 'src/helpers', restart yarn, then call it in your templates.

### String Helpers

View [working examples of these](/special/styleguide/helpers.html#string)

| Option | Description |
| ------ | ----------- |
|'capitalize'| returns the string with first letter capitalized |
|'charAt'| returns the character in the nth position |
|'chop'| returns the string with whitespace and non-word characters removed from both ends |
|'ellipsify'| returns string with all characters after nth position removed and replaced with ellipsis |
|'ellipsifyWords'| returns string with all words after nth word removed and replaced with ellipsis |
|'indexOf'| returns the position # of the first instance of the substring within the string |
|'lastIndexOf'| returns the position # of the last instance of the substring within the string |
|'length'| returns length of string |
|'lowercase'| returns string with all letters lowercased |
|'padStart'| returns the string with the initial position padded N times with character(s) provided |
|'replace'| returns the string with substring replaced with new string based on options |
|'reverse'| returns the string reversed |
|'sanitize'| returns the string with HTML and special characters removed |
|'search'| similar to indexOf, but works with regular expressions |
|'slice'| returns a portion of the string from after the nth character, up to an optional nth character|
|'split'| splits the string at specified character(s) and returns an array of N segments |
|'test'| returns true/false depending on if string contains the substring or expression provided, with optional modifiers |
|'trim'| returns the string with whitespace removed from both ends |
|'unquote'| returns the string with plaintext double quotes replaced with HTML entity quotes |
|'uppercase'| returns string with all letters uppercased |

### Number Helpers

View [working examples of these](/special/styleguide/helpers.html#number)

| Option | Description |
| ------ | ----------- |
| 'abs'| returns absolute value of N1 |
| 'add'| returns N1 + N2 |
| 'ceiling'| returns N1 rounded up to closest integer |
| 'divide'| returns N1 / N2  |
| 'exponent'| returns N1 to the power of N2 |
| 'fixed'| returns N1 formatted with fixed-point notation to N2 decimals |
| 'floor'| returns N1 rounded down to closest integer |
| 'isInteger'| returns true if N1 is an integer, else returns false |
| 'multiply'| returns N1 * N2  |
| 'negate'| returns N1 * -1 |
| 'random'| returns a random number beteween N1 and N2 |
| 'remainder'| returns the remainder of N1 / N2 |
| 'round'| returns N1 rounded off to closest integer |
| 'subtract'| returns N1 - N2  |

### Date Helpers

View [working examples of these](/special/styleguide/helpers.html#date)

| Option | Description |
| ------ | ----------- |
|'USCalendar'| returns full US formatted date of today, or optional date provided |
|'dateNum'| returns the day of the month (1-31) of today, or optional date provided |
|'dateStr'| similar to dateNum, but formatted to always be 2 characters (01-31) |
|'USDate'| returns a date with US format (mm/dd/yyyy) of today, or optional date provided |
|'weekdayNum'| returns the day of the week (1-7) of today, or optional date provided |
|'weekdayStr'| returns the day of the week (Sunday - Saturday) of today, or optional date provided |
|'month'| returns the month (January - December) of today, or optional date provided |
|'monthAbr'| returns the month abbreviation (Jan - Dec) of today, or optional date provided |
|'monthNum'| returns the month number (1-12) of today, or optional date provided |
|'monthStr'| similar to monthNum but always formatted to be 2 characters (01-12) |
|'year'| returns the year (4 digits) of today, or optional date provided |

### Array Helpers

View [working examples of these](/special/styleguide/helpers.html#array)

| Option | Description |
| ------ | ----------- |
|'concat'| returns a new array containing items from the 2 arrays passed to it |
|'inArray'| returns true if array contains specified string |
|'join' | joins elements of an array into a string with specified separators |
|'length'| returns the length of an array |
|'pop'  | removes the last item from the array and returns it  (permanently modifies the array)|
|'push' | returns the array with the new item added to the end  (permanently modifies the array)|
|'randomize'| returns a copy of the array with the items in random order|
|'reverse'| returns a copy of the array with the items in reversed order|
|'shift'| removes the first item from the array and returns it (permanently modifies the array)|
|'slice'| returns items from within the array, starting at nth item specified, up to an optional nth item |
|'sort' | returns the array with the items in alphanumeric order (permanently modifies the array)|
|'unshift'| returns the array with the new item added to the start  (permanently modifies the array)|

### SetVar Helper

View [working examples of these](/special/styleguide/helpers.html#setvar)

| Option | Description |
| ------ | ----------- |
|'setVar'| stores a root level variable that can be retrieved later |

### TypeOf Helper

View [working examples of these](/special/styleguide/helpers.html#typeof)

| Option | Description |
| ------ | ----------- |
| 'typeof'| returns true/false if item provided is of type specified |

### IfCond Helpers

View [working examples of these](/special/styleguide/helpers.html#ifcond)

| Option | Description |
| ------ | ----------- |
| '=='| returns true if (item1 == item2), else false |
| '==='| returns true if (item1 === item2), else false |
| '!='| returns true if (item1 != item2), else false |
| '!=='| returns true if (item1 !== item2), else false |
| '<'| returns true if (item1 < item2), else false |
| '<='| returns true if (item1 <= item2), else false |
| '>'| returns true if (item1 > item2), else false |
| '>='| returns true if (item1 >= item2), else false |
| '&&'| returns true if both item1 & item2 are true, else false |
| '&#124;&#124;' | returns true if either item1 or item2 is true, else false |

### URL/URI Helpers

View [working examples of these](/special/styleguide/helpers.html#uri)

| Option | Description |
| ------ | ----------- |
| 'decodeURI'| returns a decoded URI (that was previously encoded) |
| 'decodeURIComponent'| returns a decoded component URI (that was previously encoded) |
| 'encodeURI'| returns an URI encoded string |
| 'encodeURIComponent'| returns an URI component encoded string  |
| 'getHash' | returns hash portion of a URL|
| 'getHostName'| returns hostname of a URL, without query string or protocol |
| 'getProtocol'| returns protocol of a URL |
| 'getRelativePath' | returns path and filename of URL without protocol, domain, query string, or hash |
| 'getQueryString'| returns Query string of a URL |
| 'stripProtocol'| returns a URL without the protocol |
| 'stripQueryString'| returns a URL without the query string or hash |



# Custom Data

Custom data can be added to your pages. This data can then be inserted into your HTML through Handlebars. There are two ways to add data to a project.

To add variables to a specific page only, add it at the top of the page's HTML as a [Front Matter](http://jekyllrb.com/docs/frontmatter/) block. Let's say the below content is inside `src/pages/index.html`.

```html
---
title: My Typical Morning Meal
breakfast:
  - eggs
  - bacon
  - toast
---
```

Now, you can insert the values of these variables into your markup. To insert a variable, wrap the name of the variable in double curly braces, like so:

```handlebars
<h1>{{ title }}</h1>
<ul class="breakfast-items">
  {{#each breakfast}}
    <li>{{ this }}</li>
  {{/each}}
</ul>
```

This code will print three `<li>`s, one for each item in the file.
