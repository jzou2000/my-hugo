---
title: Bookmarks
---


```txt
create a hugo shortcode "ybookmarks", its content is a yaml text
that defines a list of bookmarks, e.g.

id: div-id # bookmarks container tag id
size: large # medium, large, huge, full, default is large
list:
- href: https://google.com
  img: /images/google-logo.svg
  title: google
  description: google home page
- href: /mysite/page1
  img: page1.png
  target: _self # default is _blank

The attribute href is required in a bookmark object, others are optional

An external javascript module will be loaded, a function
is called to create html tags to insert a blank tag

<div id="div-id"></div>

like this

<div id="div-id" class="van-bookmarks van-bookmarks-large">
   <div class="van-bookmark">
     <a href="https://google.com" target="_blank">
        <img src="/images/google-logo.svg">
        <div class="van-bookmark-title">google</div>
        <div class="van-bookmark-description">google home page</div>
     </a>
   </div>

   <div class="van-bookmark">
     <a href="/mysite/page1">
        <img src="page1.png">
     </a>
   </div>
</div>

The bookmarks and bookmark appearance and behavior are predefined by 
external css file. for example
van-bookmarks is a grid container
van-bookmark defines a single bookmark that is a vertical flex

js should be an es2015+ module, only vanilla js is used,
required 3rd party modules can be imported, e.g. js-yaml to parse yaml
```

grok output

```hugo
{{- $id := .Get "id" | default (printf "bookmarks-%d" .Ordinal) -}}
{{- $size := .Get "size" | default "large" -}}
{{- $yaml := .Inner -}}
<div id="{{ $id }}" class="van-bookmarks van-bookmarks-{{ $size }}"></div>
<script type="module">
import { renderBookmarks } from '/js/bookmarks.js';

try {
  renderBookmarks('{{ $id }}', `{{ $yaml }}`);
} catch (e) {
  console.error('Error rendering bookmarks:', e);
}
</script>
```

```javascript
import { load } from 'https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/+esm';

export function createBookmarkElement(bookmark) {
  const div = document.createElement('div');
  div.className = 'van-bookmark';
  
  const a = document.createElement('a');
  a.href = bookmark.href;
  a.target = bookmark.target || '_blank';
  
  if (bookmark.img) {
    const img = document.createElement('img');
    img.src = bookmark.img;
    a.appendChild(img);
  }
  
  if (bookmark.title) {
    const title = document.createElement('div');
    title.className = 'van-bookmark-title';
    title.textContent = bookmark.title;
    a.appendChild(title);
  }
  
  if (bookmark.description) {
    const desc = document.createElement('div');
    desc.className = 'van-bookmark-description';
    desc.textContent = bookmark.description;
    a.appendChild(desc);
  }
  
  div.appendChild(a);
  return div;
}

export function renderBookmarks(containerId, yamlContent) {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container with ID ${containerId} not found`);
  }
  
  const data = load(yamlContent);
  if (data?.list) {
    data.list.forEach(bookmark => {
      if (bookmark.href) {
        container.appendChild(createBookmarkElement(bookmark));
      }
    });
  }
}
```
