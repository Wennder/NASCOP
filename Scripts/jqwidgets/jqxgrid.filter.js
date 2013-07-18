/*
jQWidgets v2.3.1 (2012-July-23)
Copyright (c) 2011-2012 jQWidgets.
License: http://jqwidgets.com/license/
*/

(function(a){a.extend(a.jqx._jqxGrid.prototype,{_renderfiltercolumn:function(){var b=this;if(this.filterable){a.each(this.columns.records,function(c,d){if(b.autoshowfiltericon){if(this.filter){a(this.filtericon).show()}else{a(this.filtericon).hide()}}else{if(this.filterable){a(this.filtericon).show()}}})}},_getcolumntypebydatafield:function(e){var f=this;var d="string";var c=f.source.datafields||((f.source._source)?f.source._source.datafields:null);if(c){var h="";a.each(c,function(){if(this.name==e.datafield){if(this.type){h=this.type}return false}});if(h){return h}}if(e!=null){if(this.dataview.cachedrecords==undefined){return d}var b=null;if(!this.virtualmode){if(this.dataview.cachedrecords.length==0){return d}b=this.dataview.cachedrecords[0][e.datafield];if(b==""){return"string"}}else{a.each(this.dataview.cachedrecords,function(){b=this[e.datafield];return false})}if(b!=null){if(typeof b=="boolean"){d="boolean"}else{if(a.jqx.dataFormat.isNumber(b)){d="number"}else{var g=new Date(b);if(g.toString()=="NaN"||g.toString()=="Invalid Date"){if(a.jqx.dataFormat){g=a.jqx.dataFormat.tryparsedate(b);if(g!=null){return"date"}else{d="string"}}else{d="string"}}else{d="date"}}}}}return d},_getfiltersbytype:function(b){var c=this;var d="";switch(b){case"number":case"float":case"int":d=c.gridlocalization.filternumericcomparisonoperators;break;case"date":d=c.gridlocalization.filterdatecomparisonoperators;break;case"boolean":d=c.gridlocalization.filterbooleancomparisonoperators;break;case"string":default:d=c.gridlocalization.filterstringcomparisonoperators;break}return d},_updatefilterpanel:function(x,b,c){if(x==null||x==undefined){x=this}var d=x._getcolumntypebydatafield(c);var s=x._getfiltersbytype(d);if(!x.host.jqxDropDownList){alert("jqxdropdownlist is not loaded.");return}var n=a(b).find("#filterclearbutton"+x.element.id);var g=a(b).find("#filterbutton"+x.element.id);var u=a(b).find("#filter1"+x.element.id);var r=a(b).find("#filter2"+x.element.id);var t=a(b).find("#filter3"+x.element.id);var q=a(b).find(".filtertext1"+x.element.id);var p=a(b).find(".filtertext2"+x.element.id);q.val("");p.val("");this.removeHandler(g,"click");this.addHandler(g,"click",function(){x._buildfilter(x,b,c);x._closemenu()});this.removeHandler(n,"click");this.addHandler(n,"click",function(){x._clearfilter(x,b,c);x._closemenu()});u.jqxDropDownList({enableBrowserBoundsDetection:false,source:s});t.jqxDropDownList({enableBrowserBoundsDetection:false,source:s});if(d=="boolean"){u.jqxDropDownList({autoDropDownHeight:true,selectedIndex:0});t.jqxDropDownList({autoDropDownHeight:true,selectedIndex:0})}else{u.jqxDropDownList({autoDropDownHeight:false,selectedIndex:2});t.jqxDropDownList({autoDropDownHeight:false,selectedIndex:2})}r.jqxDropDownList({selectedIndex:0});var l=c.filter;if(l!=null){var w=l.getfilterat(0);var v=l.getfilterat(1);var k=l.getoperatorat(0);var h=[];switch(d){case"number":case"int":case"float":case"decimal":h=l.getoperatorsbyfiltertype("numericfilter");break;case"boolean":h=l.getoperatorsbyfiltertype("booleanfilter");break;case"date":case"time":h=l.getoperatorsbyfiltertype("datefilter");break;case"string":h=l.getoperatorsbyfiltertype("stringfilter");break}var j=this.enableanimations?"default":"none";if(w!=null){var f=h.indexOf(w.comparisonoperator);var o=w.filtervalue;q.val(o);u.jqxDropDownList({selectedIndex:f,animationType:j})}if(v!=null){var e=h.indexOf(v.comparisonoperator);var m=v.filtervalue;p.val(m);t.jqxDropDownList({selectedIndex:e,animationType:j})}if(l.getoperatorat(0)==undefined){r.jqxDropDownList({selectedIndex:0,animationType:j})}else{if(l.getoperatorat(0)=="and"||l.getoperatorat(0)==0){r.jqxDropDownList({selectedIndex:0})}else{r.jqxDropDownList({selectedIndex:1})}}}},_buildfilter:function(B,d,e){var y=a(d).find("#filter1"+B.element.id);var k=a(d).find("#filter2"+B.element.id);var v=a(d).find("#filter3"+B.element.id);var r=a(d).find(".filtertext1"+B.element.id);var q=a(d).find(".filtertext2"+B.element.id);var p=r.val();var n=q.val();var f=B._getcolumntypebydatafield(e);var s=B._getfiltersbytype(f);var h=y.jqxDropDownList("selectedIndex");var x=k.jqxDropDownList("selectedIndex");var g=v.jqxDropDownList("selectedIndex");var j=new a.jqx.filter();var A=null;var z=null;var c="";switch(f){case"number":case"float":case"int":c="numericfilter";break;case"boolean":c="booleanfilter";break;case"date":case"time":c="datefilter";break;case"string":c="stringfilter";break}var b=false;var w=j.getoperatorsbyfiltertype(c)[h];var v=j.getoperatorsbyfiltertype(c)[g];var o=w=="NULL"||w=="NOT_NULL";var u=w=="EMPTY"||w=="NOT_EMPTY";if(p.length>0||o||u){A=j.createfilter(c,p,w);j.addfilter(x,A);b=true}var m=v=="NULL"||v=="NOT_NULL";var t=v=="EMPTY"||v=="NOT_EMPTY";if(n.length>0||m||t){z=j.createfilter(c,n,v);j.addfilter(x,z);b=true}if(b){var l=e.datafield;this.addfilter(l,j,true)}else{this._clearfilter(B,d,e)}},_clearfilter:function(e,c,d){var b=d.datafield;this.removefilter(b,true)},addfilter:function(d,e,c){if(this._loading){alert(this.loadingerrormessage);return false}var f=this.getcolumn(d);var b=this._getcolumn(d);if(f==undefined||f==null){return}f.filter=e;b.filter=e;this.dataview.addfilter(d,e);if(c==true&&c!=undefined){this.applyfilters()}},removefilter:function(d,c){if(this._loading){alert(this.loadingerrormessage);return false}var e=this.getcolumn(d);var b=this._getcolumn(d);if(e==undefined||e==null){return}if(e.filter==null){return}this.dataview.removefilter(d,e.filter);e.filter=null;b.filter=null;if(c==true||c!=undefined){this.applyfilters()}},applyfilters:function(){var c=false;if(this.dataview.filters.length>=0&&(this.virtualmode||!this.source.localdata)){if(this.source!=null&&this.source.filter){var f=-1;if(this.pageable){f=this.dataview.pagenum;this.dataview.pagenum=0}this.source.filter(this.dataview.filters,this.dataview.records,this.dataview.records.length);if(this.pageable){this.dataview.pagenum=f}}}if(!this.virtualmode){var b=this.selectedrowindexes;var d=this;if(b.length>0){if(this.dataview.filters&&this.dataview.filters.length==0){var e=new Array();a.each(b,function(){var g=d.getrowdata(this);if(g&&g.dataindex){e[e.length]=g.dataindex}});this.selectedrowindexes=e;this.selectedrowindex=this.selectedrowindexes.length>0?this.selectedrowindexes[0]:-1}}this.dataview.refresh();if(b.length>0){if(this.dataview.filters&&this.dataview.filters.length>0){var e=new Array();a.each(b,function(){var g=d.dataview._dataIndexToBoundIndex[this];if(g!=null){e[e.length]=g.boundindex}});this.selectedrowindexes=e;this.selectedrowindex=this.selectedrowindexes.length>0?this.selectedrowindexes[0]:-1}}}else{if(this.pageable){this.dataview.updateview();if(this.gotopage){this.gotopage(0)}}this.rendergridcontent(false,false);this._raiseEvent(13,{filters:this.dataview.filters});return}if(this.pageable){this.dataview.updateview();if(this.gotopage){this.gotopage(0);this.updatepagerdetails()}}this._updaterowsproperties();if(!this.groupable){this.rendergridcontent(true,true);this._updatecolumnwidths();this._updatecellwidths();this._renderrows(this.virtualsizeinfo)}else{this.render()}this._raiseEvent(13,{filters:this.dataview.filters})},getfilterinformation:function(){var c=new Array();for(i=0;i<this.dataview.filters.length;i++){var b=this.getcolumn(this.dataview.filters[i].datafield);c[i]={filter:this.dataview.filters[i].filter,filtercolumn:b.datafield,filtercolumntext:b.text}}return c},clearfilters:function(){var b=this;if(this.columns.records){a.each(this.columns.records,function(){b.removefilter(this.datafield)})}this.applyfilters()},_destroyfilterpanel:function(){var e=a(a.find("#filterclearbutton"+this.element.id));var d=a(a.find("#filterbutton"+this.element.id));var h=a(a.find("#filter1"+this.element.id));var c=a(a.find("#filter2"+this.element.id));var g=a(a.find("#filter3"+this.element.id));var f=a(a.find(".filtertext1"+this.element.id));var b=a(a.find(".filtertext2"+this.element.id));if(f.length>0&&b.length>0){f.removeClass();b.removeClass();f.remove();b.remove()}if(e.length>0){e.jqxButton("destroy");d.jqxButton("destroy");this.removeHandler(e,"click");this.removeHandler(d,"click")}if(h.length>0){h.jqxDropDownList("destroy")}if(c.length>0){c.jqxDropDownList("destroy")}if(g>0){g.jqxDropDownList("destroy")}},_initfilterpanel:function(s,b,c,l){if(s==null||s==undefined){s=this}b[0].innerHTML="";var p=a("<div class='filter' style='margin-left: 7px;'></div>");b.append(p);var k=a("<div class='filter' style='margin-top: 3px; margin-bottom: 3px;'></div>");k.text(s.gridlocalization.filtershowrowstring);var q=a("<div class='filter' id='filter1"+s.element.id+"'></div>");var g=a("<div class='filter' id='filter2"+s.element.id+"' style='margin-bottom: 3px;'></div>");var o=a("<div class='filter' id='filter3"+s.element.id+"'></div>");var d=s._getcolumntypebydatafield(c);if(!q.jqxDropDownList){alert("jqxdropdownlist is not loaded.");return}var m=s._getfiltersbytype(d);var h=a("<div class='filter'><input class='filtertext1"+s.element.id+"' style='height: 20px; margin-top: 3px; margin-bottom: 3px;' type='text'></input></div>");h.find("input").addClass(this.toThemeProperty("jqx-input"));h.find("input").addClass(this.toThemeProperty("jqx-widget-content"));h.find("input").addClass(this.toThemeProperty("jqx-rc-all"));h.find("input").width(l-15);var j=a("<div class='filter'><input class='filtertext2"+s.element.id+"' style='height: 20px; margin-top: 3px;' type='text'></input></div>");j.find("input").addClass(this.toThemeProperty("jqx-input"));j.find("input").addClass(this.toThemeProperty("jqx-widget-content"));j.find("input").addClass(this.toThemeProperty("jqx-rc-all"));j.find("input").width(l-15);var f=a("<div class='filter' style='height: 25px; margin-left: 20px; margin-top: 7px;'></div>");var e=a('<span tabIndex=0 id="filterbutton'+s.element.id+'" class="filterbutton" style="padding: 4px 12px; margin-left: 2px;">'+s.gridlocalization.filterstring+"</span>");f.append(e);var r=a('<span tabIndex=0 id="filterclearbutton'+s.element.id+'" class="filterclearbutton" style="padding: 4px 12px; margin-left: 5px;">'+s.gridlocalization.filterclearstring+"</span>");f.append(r);e.jqxButton({height:20,theme:s.theme});r.jqxButton({height:20,theme:s.theme});var t=function(v){if(v.text().indexOf("case sensitive")!=-1){var u=v.text();u=u.replace("case sensitive","match case");v.text(u)}v.css("font-family",s.host.css("font-family"));v.css("font-size",s.host.css("font-size"));return v};p.append(k);p.append(q);q.jqxDropDownList({enableBrowserBoundsDetection:false,selectedIndex:2,width:l-15,height:20,dropDownHeight:150,dropDownWidth:l-15,selectionRenderer:t,source:m,theme:s.theme});p.append(h);var n=new Array();n[0]=s.gridlocalization.filterandconditionstring;n[1]=s.gridlocalization.filterorconditionstring;g.jqxDropDownList({enableBrowserBoundsDetection:false,autoDropDownHeight:true,selectedIndex:0,width:60,height:20,source:n,selectionRenderer:t,theme:s.theme});p.append(g);o.jqxDropDownList({enableBrowserBoundsDetection:false,selectedIndex:2,width:l-15,height:20,dropDownHeight:150,dropDownWidth:l-15,selectionRenderer:t,source:m,theme:s.theme});p.append(o);p.append(j);p.append(f)}});a.jqx.filter=function(){this.operator="and";var h=0;var e=1;var l=["EMPTY","NOT_EMPTY","CONTAINS","CONTAINS_CASE_SENSITIVE","DOES_NOT_CONTAIN","DOES_NOT_CONTAIN_CASE_SENSITIVE","STARTS_WITH","STARTS_WITH_CASE_SENSITIVE","ENDS_WITH","ENDS_WITH_CASE_SENSITIVE","EQUAL","EQUAL_CASE_SENSITIVE","NULL","NOT_NULL"];var n=["EQUAL","NOT_EQUAL","LESS_THAN","LESS_THAN_OR_EQUAL","GREATER_THAN","GREATER_THAN_OR_EQUAL","NULL","NOT_NULL"];var o=["EQUAL","NOT_EQUAL","LESS_THAN","LESS_THAN_OR_EQUAL","GREATER_THAN","GREATER_THAN_OR_EQUAL","NULL","NOT_NULL"];var g=["EQUAL","NOT_EQUAL"];var f=new Array();var m=new Array();this.evaluate=function(s){var r=true;for(i=0;i<f.length;i++){var q=f[i].evaluate(s);if(i==0){r=q}else{if(m[i]==e||m[i]=="or"){r=r||q}else{r=r&&q}}}return r};this.getfilterscount=function(){return f.length};this.getoperatorsbyfiltertype=function(q){var r=new Array();switch(q){case"numericfilter":r=n.slice(0);break;case"stringfilter":r=l.slice(0);break;case"datefilter":r=o.slice(0);break;case"booleanfilter":r=g.slice(0);break}return r};var k=function(){var q=function(){return(((1+Math.random())*65536)|0).toString(16).substring(1)};return(q()+"-"+q()+"-"+q())};this.createfilter=function(t,q,s,r){if(t==null||t==undefined){return null}switch(t){case"numericfilter":return new j(q,s.toUpperCase());case"stringfilter":return new p(q,s.toUpperCase());case"datefilter":return new c(q,s.toUpperCase());case"booleanfilter":return new d(q,s.toUpperCase());case"custom":return new b(q,s.toUpperCase(),r)}return null};this.getfilters=function(){var q=new Array();for(i=0;i<f.length;i++){var r={value:f[i].filtervalue,condition:f[i].comparisonoperator,operator:m[i]};q[i]=r}return q};this.addfilter=function(q,r){f[f.length]=r;r.key=k();m[m.length]=q};this.removefilter=function(q){for(i=0;i<f.length;i++){if(f[i].key==q.key){f.splice(i,1);m.splice(i,1);break}}};this.getoperatorat=function(q){if(q==undefined||q==null){return null}if(q<0||q>f.length){return null}return m[q]};this.setoperatorat=function(r,q){if(r==undefined||r==null){return null}if(r<0||r>f.length){return null}m[q]=q};this.getfilterat=function(q){if(q==undefined||q==null){return null}if(q<0||q>f.length){return null}return f[q]};this.setfilterat=function(q,r){if(q==undefined||q==null){return null}if(q<0||q>f.length){return null}r.key=k();f[q]=r};this.clear=function(){f=new Array();m=new Array()};var p=function(r,q){this.filtervalue=r;this.comparisonoperator=q;this.evaluate=function(v){var u=this.filtervalue;var s=this.comparisonoperator;if(v==null||v==undefined){if(s=="NULL"){return true}return false}var w="";try{w=v.toString()}catch(t){return true}switch(s){case"EQUAL":return a.jqx.string.equalsIgnoreCase(w,u);case"EQUAL_CASE_SENSITIVE":return a.jqx.string.equals(w,u);case"CONTAINS":return a.jqx.string.containsIgnoreCase(w,u);case"CONTAINS_CASE_SENSITIVE":return a.jqx.string.contains(w,u);case"DOES_NOT_CONTAIN":return !a.jqx.string.containsIgnoreCase(w,u);case"DOES_NOT_CONTAIN_CASE_SENSITIVE":return !a.jqx.string.contains(w,u);case"EMPTY":return w=="";case"NOT_EMPTY":return w!="";case"NOT_NULL":return w!=null;case"STARTS_WITH":return a.jqx.string.startsWithIgnoreCase(w,u);case"ENDS_WITH":return a.jqx.string.endsWithIgnoreCase(w,u);case"ENDS_WITH_CASE_SENSITIVE":return a.jqx.string.endsWith(w,u);case"STARTS_WITH_CASE_SENSITIVE":return a.jqx.string.startsWith(w,u);default:return false}}};var d=function(r,q){this.filtervalue=r;this.comparisonoperator=q;this.evaluate=function(u){var t=this.filtervalue;var s=this.comparisonoperator;if(u==null||u==undefined){if(s=="NULL"){return true}return false}var v=u;switch(s){case"EQUAL":return v==t||v.toString()==t.toString();case"NOT_EQUAL":return v!=t&&v.toString()!=t.toString();default:return false}}};var j=function(r,q){this.filtervalue=r;this.comparisonoperator=q;this.evaluate=function(v){var u=this.filtervalue;var s=this.comparisonoperator;if(v==null||v==undefined){if(s=="NOT_NULL"){return false}if(s=="NULL"){return true}else{return false}}else{if(s=="NULL"){return false}if(s=="NOT_NULL"){return true}}var w=v;try{w=parseFloat(w)}catch(t){if(v.toString()!=""){return false}}switch(s){case"EQUAL":return w==u;case"NOT_EQUAL":return w!=u;case"GREATER_THAN":return w>u;case"GREATER_THAN_OR_EQUAL":return w>=u;case"LESS_THAN":return w<u;case"LESS_THAN_OR_EQUAL":return w<=u;default:return true}}};var c=function(r,q){this.filtervalue=r;var s=new Date(r);if(s.toString()=="NaN"||s.toString()=="Invalid Date"){this.filterdate=a.jqx.dataFormat.tryparsedate(r)}else{this.filterdate=s}this.comparisonoperator=q;this.evaluate=function(A){var B=this.filtervalue;var y=this.comparisonoperator;if(A==null||A==undefined){if(y=="NOT_NULL"){return false}if(y=="NULL"){return true}else{return false}}else{if(y=="NULL"){return false}if(y=="NOT_NULL"){return true}}var t=new Date();t.setFullYear(1900,0,1);t.setHours(12,0,0,0);try{var w=new Date(A);if(w.toString()=="NaN"||w.toString()=="Invalid Date"){A=a.jqx.dataFormat.tryparsedate(A)}else{A=w}t=A}catch(x){if(A.toString()!=""){return false}}if(this.filterdate!=null){B=this.filterdate}else{if(B.indexOf(":")!=-1||!isNaN(parseInt(B))){var z=new Date(t);z.setHours(12,0,0,0);var u=B.split(":");for(var v=0;v<u.length;v++){if(v==0){z.setHours(u[v])}if(v==1){z.setMinutes(u[v])}if(v==2){z.setSeconds(u[v])}}B=z}}switch(y){case"EQUAL":return t.toString()==B.toString();case"NOT_EQUAL":return t.toString()!=B.toString();case"GREATER_THAN":return t>B;case"GREATER_THAN_OR_EQUAL":return t>=B;case"LESS_THAN":return t<B;case"LESS_THAN_OR_EQUAL":return t<=B;default:return true}}};var b=function(r,q,s){this.filtervalue=r;this.comparisonoperator=q;this.evaluate=function(u,t){return s(this.filtervalue,u,this.comparisonoperator)}}}})(jQuery);