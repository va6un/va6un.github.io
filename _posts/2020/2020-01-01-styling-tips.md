---
layout: post
title:	"styling tips!"
date:	2020-01-01 12:00:00
categories:
    - blog
tags:
    - css
    - tips
---

### Unit
> em: font-size of its direct(or nearest) parent. `1em = 1 times parent's font-size`.

> rem: relative to HTML root element's font-size. `Default 16px.`

### Selectors

```css
/* Class */
.class-name {
}

/* ID */
#id-name {
}

/* Element */
div{
}
```

### Box model
> Margin -> Border -> Padding -> Content

### Flex

```html
    <style>
    .red {
        background-color: orangered;
        border: 1px solid #000;
        width: 250px;
        height: 250px;
    }

    .green {
        background-color: greenyellow;
        border: 1px solid #000;
        width: 50px;
        height: 50px;
    }

    #container1 {
        display: flex;
    }

    /* flex-direction row */
    #container2 {
        display: flex;
        flex-direction: row;
    }

    /* flex-direction column */
    #container3 {
        display: flex;
        flex-direction: column;
    }

    /* flex alignment with flex-direction row */
    #container4 {
        display: flex;
        flex-direction: row;
        /* top-bottom (cross-axis)*/
        align-items: center;
        /* left-right (main-axis) */
        justify-content: space-around;
    }

    /* flex alignment with flex-direction column */
    #container5 {
        display: flex;
        flex-direction: column;
        /* top-bottom (cross-axis). flex-end -> right side*/
        align-items: flex-end;
        /* left-right (main-axis) */
        justify-content: space-around;
    }
    </style>
    <div id="container1" class="red">
        <div class="green"></div>
        <div class="green"></div>
        <div class="green"></div>
    </div>
    
    <h5>flex-direction row</h5>
    <div id="container2" class="red">
        <div class="green"></div>
        <div class="green"></div>
        <div class="green"></div>
    </div>
    
    <h5>flex-direction column</h5>
    <div id="container3" class="red">
        <div class="green"></div>
        <div class="green"></div>
        <div class="green"></div>
    </div>

    <h5>flex alignment with flex-direction row</h5>
    <div id="container4" class="red">
        <div class="green"></div>
        <div class="green"></div>
        <div class="green"></div>
    </div>

    <h5>flex alignment with flex-direction column</h5>
    <div id="container5" class="red">
        <div class="green"></div>
        <div class="green"></div>
        <div class="green"></div>
    </div>
```
### Grid

```html
<style>
        .green{
            background-color: greenyellow;
            border: 1px solid #000;
        }
        #red1{
            display: grid;
            /* 3 columns. Equal spacing */
            grid-template-columns: 1fr 1fr 1fr;
            /* 2 rows with height 10rem */
            grid-template-rows: 10rem 10rem;
        }
        #red2{
            display: grid;
            /* 2 columns 25% 75%*/
            grid-template-columns: 1fr 3fr;
            /* 3 rows */
            grid-template-rows: 5rem 10rem 3rem;
            grid-gap: 10px;
        }
        #red3{
            display: grid;
            /* columns are auto-fit. with minimum width 20rem */
            grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
            /* 4 rows with 10rem height */
            grid-template-rows: 10rem 10rem 10rem 10rem;
            grid-gap: 10px;
        }
    </style>
    <hr>
    <h5>3 x 2 Grid</h5>
    <div id="red1">
        <div class="green">
            <p>1</p>
        </div>
        <div class="green">
            <p>2</p>
        </div>
        <div class="green">
            <p>3</p>
        </div>
        <div class="green">
            <p>4</p>
        </div>
        <div class="green">
            <p>5</p>
        </div>
        <div class="green">
            <p>6</p>
        </div>
    </div>

    <hr>
    <h5>2 x 3 Grid</h5>
    <div id="red2">
        <div class="green">
            <p>1</p>
        </div>
        <div class="green">
            <p>2</p>
        </div>
        <div class="green">
            <p>3</p>
        </div>
        <div class="green">
            <p>4</p>
        </div>
        <div class="green">
            <p>5</p>
        </div>
        <div class="green">
            <p>6</p>
        </div>
    </div>

    <hr>
    <h5> auto-fit x 4 Grid</h5>
    <div id="red3">
        <div class="green">
            <p>1</p>
        </div>
        <div class="green">
            <p>2</p>
        </div>
        <div class="green">
            <p>3</p>
        </div>
        <div class="green">
            <p>4</p>
        </div>
        <div class="green">
            <p>5</p>
        </div>
        <div class="green">
            <p>6</p>
        </div>
    </div>
```


