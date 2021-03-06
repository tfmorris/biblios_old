Ext.ux.ImprovedPagingToolbar = Ext.extend(Ext.Toolbar,

{

   autoLoad: false,

   sliderBuffer: 300,

   sliderWidth: 300,

   mode: 'buttons',

   includeTextbox: true,

   pageSize: 20,

   displayMsg : 'Displaying {0} - {1} of {2}',

   msgFormatFunc : function() {
        var count = this.store.getCount(); 
        var disp = (this.current * this.pageSize) + 1;
       return String.format(this.displayMsg, disp, disp+count-1, this.store.getTotalCount());
    },

   emptyMsg : 'No data to display',

   beforePageText : "Page",

   afterPageText : "of {0}",

   firstText : "First Page",

   prevText : "Previous Page",

   nextText : "Next Page",

   lastText : "Last Page",

   refreshText : "Refresh",

   paramNames : {start: 'start', limit: 'limit'},

   

   initComponent: function()

   {

      Ext.PagingToolbar.superclass.initComponent.call(this);

      this.current = 0;

      this.useSlider = this.mode == 'slider';

      this.bind(this.store);

      this.addEvents('beforepagechange', 'pagechange');

   },

   

   onRender: function(ct, position)

   {

      Ext.PagingToolbar.superclass.onRender.call(this, ct, position);

      

      if (this.useSlider)

      {

         this.sliderCt = Ext.get(this.addDom({tag: 'div'}).el);

         this.slider = new Ext.Slider(

         {

            minValue: 0,

            maxValue: 0,

            width: this.sliderWidth

         }

         );

         this.slider.render(this.sliderCt);

         this.slider.disable();

         this.sliderTip = new Ext.Tip(

         {

            minWidth: 10,

            offsets: [0, -10]

         }

         );

         this.slider.on('dragstart', this.onSlide, this);

         this.slider.on('drag', this.onSlide, this);

         this.slider.on('change', this.onSlideChange, this, {buffer: this.sliderBuffer});

         this.slider.on('dragend', this.sliderTip.hide, this.sliderTip);

         this.slider.on('destroy', this.sliderTip.destroy, this.sliderTip);

         this.setupTextBox();

      }

      else

      {

         this.first = this.addButton(

         {

            tooltip: this.firstText,

            iconCls: "x-tbar-page-first",

            disabled: true,

            scope: this,

            handler: this.moveFirst

        }

        );

        this.prev = this.addButton(

        {

           tooltip: this.prevText,

           iconCls: "x-tbar-page-prev",

           disabled: true,

           scope: this,

           handler: this.movePrevious

        }

        );

        this.setupTextBox();

        this.addSeparator();

        this.next = this.addButton(

        {

           tooltip: this.nextText,

           iconCls: "x-tbar-page-next",

           disabled: true,

           scope: this,

           handler: this.moveNext

        }

        );

        this.last = this.addButton(

        {

           tooltip: this.lastText,

           iconCls: "x-tbar-page-last",

           disabled: true,

           scope: this,

           handler: this.moveLast

        }

        );

      }

      

      this.addSeparator();

      this.loading = this.addButton(

      {

         tooltip: this.refreshText,

         iconCls: "x-tbar-loading",

         scope: this,

         handler: this.refresh

      }

      );

      

      if (this.displayInfo)

         this.displayEl = Ext.fly(this.el.dom).createChild({cls:'x-paging-info'});



      if (this.autoLoad)

         this.doLoad(0);

      else if (this.dsLoaded)

         this.onLoad.apply(this, this.dsLoaded);

   },

   

   getPageSize: function()

   {

      return this.pageSize;

   },

   

   setPageSize: function(size)

   {

      this.pageSize = size;

      this.moveFirst();

   },

   

   getActivePage: function()

   {

      return this.current;

   },

   

   setActivePage: function(page)

   {

      if (!isNaN(page))

      {

         if (page >= 0 && page <= this.getLastPage())

         {

            this.doLoad(page);

            return true;

         }

      }

      return false;

   },

   

   refresh: function()

   {

      this.doLoad(this.current);

   },

   

   moveFirst: function()

   {

      return this.setActivePage(0);

   },

   

   movePrevious: function()

   {

      return this.setActivePage(this.current - 1);

   },

   

   moveNext: function()

   {

      return this.setActivePage(this.current + 1);

   },

   

   moveLast: function()

   {

      return this.setActivePage(this.getLastPage());

   },

   

   unbind: function(store)

   {

      store = Ext.StoreMgr.lookup(store);

      store.un("beforeload", this.beforeLoad, this);

      store.un("load", this.onLoad, this);

      store.un("loadexception", this.onLoadError, this);

      this.store = undefined;

   },



   bind : function(store)

   {

      store = Ext.StoreMgr.lookup(store);

      store.on("beforeload", this.beforeLoad, this);

      store.on("load", this.onLoad, this);

      store.on("loadexception", this.onLoadError, this);

      this.store = store;

   },

   

   //private

   onSlideChange: function(s, value)

   {

      this.doLoad(value);

   },

   

   //private

   onSlide: function()

   {

      var t = this.sliderTip;

      var s = this.slider;

      t.show();

      t.body.update(s.getValue() + 1);

      t.doAutoWidth();

      t.el.alignTo(s.thumb, 'b-t?', t.offsets);

   },

   

   //private

   setupTextBox: function()

   {

      if (this.includeTextbox)

      {

         this.addSeparator();

         this.add(this.beforePageText);

         this.field = Ext.get(this.addDom(

         {

            tag: "input",

            type: "text",

            size: "3",

            value: "1",

            cls: "x-tbar-page-number"

         }).el);

         this.field.on("keydown", this.onPagingKeydown, this);

         this.field.on("focus", function()

         {

            this.dom.select();

         }

         );

         this.afterTextEl = this.addText(String.format(this.afterPageText, 1));

         this.field.setHeight(18);

      }

   },

   

   //private

   updateInfo: function()

   {

      if (this.displayEl)

      {


         var msg = this.store.getCount() == 0 ? this.emptyMsg : this.msgFormatFunc();

         this.displayEl.update(msg);

      }

    },

    

    //private

    getPageData: function()

    {

       var total = this.store.getTotalCount();

       return {

          total: total,

          pages:  total < this.pageSize ? 1 : Math.ceil(total / this.pageSize)

       };

    },

   

   //private

   onLoad: function(store, r, o)

   {

      if (!this.rendered)

      {

         this.dsLoaded = [store, r, o];

         return;

      }

      

      var p = o.params;

      this.current = p ? Math.floor(p[this.paramNames.start] / p[this.paramNames.limit]) : 0;

      this.fireEvent('pagechange', this, this.current);


      var pages = this.getPageData().pages;

      if (this.includeTextbox)

      {

         this.afterTextEl.el.innerHTML = String.format(this.afterPageText, pages);

         this.field.dom.value = this.current + 1;

      }

      

      if (this.useSlider)

      {

         this.slider.enable();

         this.slider.setMaxValue(pages - 1);

      }

      else

      {

         this.first.setDisabled(this.current == 0);

         this.prev.setDisabled(this.current == 0);

         this.next.setDisabled(this.current == pages - 1);

         this.last.setDisabled(this.current == pages - 1);

      }

      this.loading.enable();

      this.updateInfo();

   },

   

   //private

   onLoadError: function()

   {

      if (!this.rendered)

         return;



      this.loading.enable();

   },

   

   //private

   beforeLoad: function()

   {

      if (this.rendered && this.loading)

         this.loading.disable();

   },

   

   //private

   doLoad: function(start)

   {

      if (this.fireEvent('beforepagechange', this, start) !== false)

      {
          this.lastRecordCount = this.store.getCount();

         var o = {}, pn = this.paramNames;

         o[pn.start] = start * this.pageSize;

         o[pn.limit] = this.pageSize;

         o['sort'] = UI.search.currentSort.field + ':' + UI.search.currentSort.dir;

         if(bibliosdebug) {
            console.debug('searchgrid page load: using load params ' + o);
        }


         this.store.load({params:o});

      }

      else

      {

         if (this.useTextBox)

            this.field.dom.value = this.current + 1;

            

         if (this.useSlider)

         {

            var s = this.slider;

            s.suspendEvents();

            s.setValue(this.current, false);

            s.resumeEvents();

         }

      }

   },

   

   //private

   readPage : function()

   {

      var v = this.field.dom.value, pageNum;

      if (!v || isNaN(pageNum = parseInt(v, 10))) 

      {

         this.field.dom.value = this.current + 1;

         return false;

      }

      return pageNum;

   },

   

   //private

   onPagingKeydown: function(e)

   {

      var k = e.getKey(), pages = this.getPageData().pages, pageNum;

      if (k == e.RETURN) 

      {

         e.stopEvent();

         if (pageNum = this.readPage())

         {

            pageNum = Math.min(Math.max(1, pageNum), pages) - 1;

            this.loadOrSet(pageNum);

         }

      }

      else if (k == e.HOME || k == e.END)

      {

         e.stopEvent();

         pageNum = k == e.HOME ? 1 : pages;

         this.field.dom.value = pageNum;

         this.loadOrSet(pageNum - 1);

      }

      else if (k == e.UP || k == e.PAGEUP || k == e.DOWN || k == e.PAGEDOWN)

      {

         e.stopEvent();

         if (pageNum = this.readPage())

         {

            var increment = e.shiftKey ? 10 : 1;

            if (k == e.DOWN || k == e.PAGEDOWN)

               increment *= -1;

               

            pageNum += increment;

            if (pageNum > pages)

               pageNum = pages;

            else if (pageNum < 1)

               pageNum = 1;

               

            this.field.dom.value = pageNum;

            this.loadOrSet(pageNum - 1);

         }

      }

   },

   

   //private

   loadOrSet: function(num)

   {

      if (this.useSlider && this.slider.getValue() != num)

         this.slider.setValue(num);

      else

         this.doLoad(num);

   },

   

   //private

   getLastPage: function()

   {

      return this.getPageData().pages - 1;

   }

}

);
