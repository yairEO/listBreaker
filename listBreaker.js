/**
 * Splits a list node into multiple lists
 * BY: YAIR EVEN-OR (C) 2016
 * https://github.com/yairEO/listBreaker
 *
 * @param  {DOM node} elm [the DOM element list to break]
 * @param  {Object} options [available keys: "lists", "itemsPerList"]
 * @return DOM fragment element
 */
function ListBreaker( elm, method, value ){
    this.original = elm;
    this.method = method; // "n-items" / "n-lists"
    this.methodValue = value;
    this.uid = Math.random().toString(36).substring(7);
}

ListBreaker.prototype = {
    /**
    * Breaks, depending on the method
    * @param  {object} soruceList    [DOM list element]
    * @return {Array}                [Array of Array of list items]
    */
    break( sourceList = this.original ){
        // if list was already broken to lists, re-make
        if( this.lists ) return;

        this.lists = [];
        var listsFragment;

        // break list accordnig to chosen method (list-to-N-items-in-list / list-to-N-lists)
        listsFragment = this.listToLists(sourceList, this.methodValue, this.method);

        for( var i=0; i < listsFragment.children.length; i++ )
            this.lists.push( listsFragment.children[i] )

         // replace the original list with the new lists
        this.original.parentNode.replaceChild(listsFragment, this.original);
        return this.lists;
    },

    /**
    * Called when items were removed or added and the components need to recalculate.
    * First consolidates the list, then break it again.
    * If the list is not splited (this.lists is null), do not continue
    */
    update(){
        if( !this.lists ) return;
        this.break( this.joinLists() )
    },

    /**
    * Consolidate split lists into one single list
    * @param  {Array}   lists        [Array of Arrays of list items]
    * @param  {Boolean} renderToDom  [flag - should the result be rendered back into the DOM]
    * @return {object}               [Consolidated HTML list element]
    */
    joinLists( lists = this.lists, renderToDom ){
        var tempList = this.createList(), lastList;

        if( !lists ) return;

        lists.forEach((list, idx)=>{
            while(list.children.length > 0)
                tempList.appendChild(list.children[0]);

            // last list
            if( idx == lists.length - 1)
                lastList = list;
            else
                list.parentNode.removeChild(list);
        })

        if( renderToDom ){
            lastList.parentNode.replaceChild(tempList, lastList);
            this.original = tempList;
        }
        else
            this.original = lastList;

        this.lists = null;

        return tempList;
    },

    /**
    * Convert the source list into lists
    * @param  {object} soruceList  [DOM list element]
    * @param  {Number} chunksCount [Maximum number of lists]
    * @return {object}             [DOM fragment]
    */
    listToLists(soruceList = this.original, chunksCount = this.methodValue, method) {
        var arr = [...soruceList.children], // convert HTMLCollection into an real Array of nodes
            fragment = document.createDocumentFragment(),
            startIdx = 1;

        while(arr.length) {
            var chunkSize = method == "n-items" ? chunksCount : Math.ceil(arr.length / chunksCount--),
                chunkItem, chunk = arr.slice(0, chunkSize),
                list = this.createList(),  // for every chunk create a new list
            // move the chunk items in the created list
            for( chunkItem of chunk )
                list.appendChild(chunkItem);

            // set start index for "<ol>" lists
            if( list.tagName == 'OL' )
                list.start = startIdx;

            startIdx += chunk.length; // update "start index" value

            // move the list into the fragment
            fragment.appendChild(list);

            // re-set the arr for next iteration
            arr = arr.slice(chunkSize);
        }

        return fragment;
    },

    /**
    * Creates a new list HTML element
    * @param  {text} tagName  [Tag name element to create (ol/ul/dl)]
    * @return {object}        [HTML list element]
    */
    createList( tagName = this.original.tagName ){
        var list = document.createElement( tagName );
        list.id = this.uid;
        return list;
    }
}