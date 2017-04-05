var ijf = ijf || {};
ijf.extUtils ={
renderField:function(inFormKey, item, inField, inContainer)
{
	//ensure  fleshed inField for key fields
	(inField.style) ? null: inField.style="";
	(inField.fieldStyle) ? null: inField.fieldStyle="";
	(inField.labelStyle) ? null: inField.labelStyle="";
	(inField.panelStyle) ? null: inField.panelStyle="";
	(inField.event) ? null: inField.event="";
	(inField.renderif) ? null: inField.renderif="";
	(inField.caption) ? null: inField.caption="";
	(inField.dataSource) ? null: inField.dataSource="";
	(inField.tooltip) ? null: inField.toolTip="";


    //attempt to pull data....
    try
    {
        switch(inField.controlType) {
            case 'textbox':
                ijf.extUtils.renderTextbox(inFormKey,item,inField,inContainer);
                break;
            case 'textarea':
                ijf.extUtils.renderTextarea(inFormKey,item,inField,inContainer);
                break;
            case 'formbuttons':
                ijf.extUtils.renderFormButtons(inFormKey,item,inField,inContainer);
                break;
            case 'html':
                ijf.extUtils.renderHtml (inFormKey,item,inField,inContainer);
                break;
            case 'navigatetoform':
                ijf.extUtils.renderNavigateToForm (inFormKey,item,inField,inContainer);
                break;
            case 'datebox':
                ijf.extUtils.renderDatebox(inFormKey,item,inField,inContainer);
                break;
            case 'dropdown':
                ijf.extUtils.renderDropdown (inFormKey,item,inField,inContainer);
                break;
            case 'radio':
                ijf.extUtils.renderRadiogroup (inFormKey,item,inField,inContainer);
                break;
            case 'checkbox':
                ijf.extUtils.renderCheckbox (inFormKey,item,inField,inContainer);
                break;
            case 'multiselect':
                ijf.extUtils.renderMultiselect (inFormKey,item,inField,inContainer);
                break;
            case 'button':
                ijf.extUtils.renderBlankbutton(inFormKey,item,inField,inContainer);
                break;
            case 'tabmenu':
                ijf.extUtils.renderTabmenu(inFormKey,item,inField,inContainer);
                break;
            case 'userpicker':
                ijf.extUtils.renderUserPicker (inFormKey,item,inField,inContainer);
                break;
            case 'attachmentlist':
                ijf.extUtils.renderAttchmentList (inFormKey,item,inField,inContainer);
                break;
            case 'attachmentupload':
                ijf.extUtils.renderAttachmentUpload(inFormKey,item,inField,inContainer);
                break;
            case 'commentlist':
                ijf.extUtils.renderCommentList (inFormKey,item,inField,inContainer);
                break;
            case 'subform':
                ijf.extUtils.renderNestedForm (inFormKey,item,inField,inContainer);
                break;
            case 'itemlist':
                ijf.extUtils.renderItemList (inFormKey,item,inField,inContainer);
                break;
            case 'openpopform':
                ijf.extUtils.renderPopFormButton(inFormKey,item,inField,inContainer);
                break;
            case 'formbuttonsforpopup':
                ijf.extUtils.renderPopupFormButtons(inFormKey,item,inField,inContainer);
                break;
            case 'openurl':
                ijf.extUtils.renderButtonLink(inFormKey,item,inField,inContainer);
                break;
            case 'iframe':
                ijf.extUtils.renderIframe(inFormKey,item,inField,inContainer);
                break;

            default:
                inContainer.innerHTML="no control for type: " + inField.controlType;
        }
    }
    catch(e)
    {
        throw("Error with: " + inField.controlType + " " + e.message);
    }
},
 renderIframe:function(inFormKey,item, inField, inContainer)
{
    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);
    var collapsible = false;
    if (inField.style.indexOf('collapsible:true')>-1)
    {
        collapsible=true;
    }
    var collapsed = false;
    if (inField.style.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }
    var seamless = ""; // Whether or not to add the seamless HTML5 attribute and onload event to grab inner document height.
    var onload = ""
    if (inField.style.indexOf('seamless:true')>-1)
    {
        inField.style.replace('seamless:true', "")
        seamless = " seamless ";
        onload = "onload=\"this.style.height=this.contentDocument.body.scrollHeight +'px';\""
    }
    var panelTitle = "";
    if (inField.style.indexOf('panelTitle:')>-1)
    {
        panelTitle = inField.style.substr(inField.style.indexOf('panelTitle:')+11);
        var tPt = panelTitle.split(";");
        panelTitle= ijfUtils.replaceKeyValues(tPt[0],item);
    }

    var urlRe = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
    // url regex from https://gist.github.com/dperini/729294 under MIT license
    var iframeSrc = "http://www.google.com" // Default src
    if (inField.dataSource){
        iframeSrc = ijfUtils.replaceKeyValues(inField.dataSource,item);
        //if (iframeSrc.trim().match(urlRe)) iframeSrc = iframeSrc.trim().match(urlRe)
    }
    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;

    var iframeHTML = "<iframe src=\"" + iframeSrc + "\" " + seamless + onload + "style=\"" + l_fieldStyle + "\"></iframe>";
    var pHeight =ijfUtils.getNameValueFromStyleString(inField.fieldStyle,"height");
    var simple = new Ext.Panel({
        //labelAlign: 'left',
        collapsible: collapsible,
        collapsed: collapsed,
        title: panelTitle,
        bodyStyle: l_panelStyle,
        //width:lWidth,
        //height: pHeight,
        border:false,
        hidden: hideField,
        html: iframeHTML,
        scrollable: true
    });

	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);
    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);

}
,
 renderNestedForm:function(inFormKey,item, inField, inContainer)
{

    var nestedFormKey = inField.dataSource;
    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);
    var collapsible = false;
    if (inField.style.indexOf('collapsible:true')>-1)
    {
        collapsible=true;
    }
    var collapsed = false;
    if (inField.style.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }
    var panelTitle = "";
    if (inField.style.indexOf('panelTitle:')>-1)
    {
        panelTitle = inField.style.substr(inField.style.indexOf('panelTitle:')+11);
        var tPt = panelTitle.split(";");
        panelTitle= ijfUtils.replaceKeyValues(tPt[0],item);
    }

    if(collapsible)
    {
		var l_labelStyle = inField.labelStyle;
		var l_panelStyle = inField.panelStyle;
		var l_Style = inField.style;

		if(!l_labelStyle) l_labelStyle="background:transparent";
		if(!l_panelStyle) l_panelStyle="background:transparent";
		if(!l_Style) l_Style="background:transparent";

        if(inField.dataReference)
        {
            try
            {
                ijf.main.gSubformParams = JSON.parse(inField.dataReference);
            }
            catch(e)
            {
                footLog("Error with nested form paramMap");
                ijf.main.gSubformParams = null;
            }
        }
        var nfId = inFormKey+inField.formCell.replace(",","")+"_nest";
        var nfContainer = "<div id=\"" + nfId + "\">Initial</div>";
        var simple = new Ext.Panel({
            //labelAlign: 'left',
            collapsible: collapsible,
            collapsed: collapsed,
            title: panelTitle,
            style: l_Style,
            bodyStyle: l_panelStyle,
            border:true,
            hidden: hideField,
            html: nfContainer,
            scrollable: true
        });
		//before render....
		if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);

        simple.render(inContainer);
		var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
		ijf.main.controlSet[thisControl.id]=thisControl;
		ijf.main.renderForm(nfId, inField.dataSource, true, item);
	    //after render....
	    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);

    }
    else
    {
		//before render....
		if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](null,inFormKey,item, inField, inContainer);
        if(!hideField) ijf.main.renderForm(inContainer.id.replace(",",""), inField.dataSource, true, item);
	    //after render....
	    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](null, inFormKey,item, inField, inContainer);

    }
    ijf.main.gSubformParams=null;
}
,
renderPopupForm:function(inFormKey,inItem, inAction)
{
    var nfId = inFormKey+inAction.inField.formCell.replace(",","")+"_pop";
    var nfContainer = "<div id=\"" + nfId + "\">Initial</div>";
    var rItem = inItem;

    //get form and use to set the dWin params
    var pForm = ijf.fw.forms[inAction.form];

    (pForm.settings.tabTitle) ? null: pForm.settings.tabTitle="No title set";
    (pForm.settings.outerContainerStyle) ? null: pForm.settings.outerContainerStyle="";
    (pForm.settings.innerContainerStyle) ? null: pForm.settings.innerContainerStyle="";

    var wWidth = ijfUtils.getNameValueFromStyleString(pForm.settings.outerContainerStyle,'width');
	(wWidth=="") ? wWidth=300: wWidth=wWidth.replace("px","").replace("%","")/1;

    var wHeight = ijfUtils.getNameValueFromStyleString(pForm.settings.outerContainerStyle,'height');
	(wHeight=="") ? wHeight=300: wHeight=wHeight.replace("px","").replace("%","")/1;

    var iWidth = ijfUtils.getNameValueFromStyleString(pForm.settings.outerTableStyle,'width');
	(iWidth=="") ? iWidth=300: iWidth=iWidth.replace("px","").replace("%","")/1;

    var iHeight = ijfUtils.getNameValueFromStyleString(pForm.settings.outerTableStyle,'height');
	(iHeight=="") ? iHeight=300: iHeight=iHeight.replace("px","").replace("%","")/1;


    var simple = new Ext.Panel({
        //bodyStyle: inAction.fieldStyle,
        width: iWidth,
        height: iHeight,
        style: pForm.innerContainerStyle,
        border:true,
        html: nfContainer
    });

    var tempItem = ijf.currentItem;
    var tempItemId = ijf.main.itemId;
    ijf.main.parentItemId =null;
    var popType="";
    if(inAction.type) popType=inAction.type;
    //some someforms need parents to complete, saved here
	switch(popType)
	{
		case "new related":
		   	ijf.main.itemId = null;
		   	ijf.currentItem =  null;
		   	rItem=null;
		   	break;
		case "new subtask":
			ijf.main.parentItemId = ijf.main.itemId;
		   	ijf.main.itemId = null;
		   	ijf.currentItem =  null;
		   	rItem=null;
		   	break;
		case "open item":
		   	ijf.main.itemId = inAction.itemId;  //the one to pop to...
		   	rItem= ijfUtils.getJiraIssueSync(ijf.main.itemId);
		   	//ijf.currentItem =  null;
		   	break;
		default:
			break;
	}

    var wTitle = ijfUtils.replaceKeyValues(pForm.settings.tabTitle, rItem);

    var dWin = new Ext.Window({
        // layout: 'fit',
        title:  wTitle,
        width: wWidth,
        height: wHeight,
        style: pForm.outerContainerStyle,
        scrollable: "vertical",
        closable: true,
        items: [simple],
        modal: true,
        listeners:{
            beforedestroy: function(f)
            {
				switch(popType)
				{
					case "new related":
					//ijf.main.itemId = the new key, and tempItemId is the OLD key.  set the 'relationship'
					    //verify both Keys exist and are different...
					    if((tempItemId) &&(ijf.main.itemId) &&(ijf.main.itemId!=tempItemId))
					    {
							var jsonString = {
											"type": {
												"name": "Relates"
											   },
											"inwardIssue": {
												"key": tempItemId
											   },
											"outwardIssue": {
												"key": ijf.main.itemId
											   },
											"comment":{
												"body":"Linked related issue"
											  }
							};
							var saveRes = ijfUtils.jiraApiSync("POST","/rest/api/2/issueLink",JSON.stringify(jsonString));
							if(saveRes!="OK")
							{
								ijfUtils.modalDialogMessage("Error","Unable to establish the issue link: " + saveRes);
							}
						}
						break;
					default:
						break;
				}

                //rerender the current form....
                ijf.currentItem = null; //tempItem;
                ijf.main.itemId = tempItemId;
				ijf.main.processSetup("ijfContent");
                //ijf.main.renderForm("ijfContent", ijf.main.outerForm.name, false, tempItem);
            }
        }
    });
    dWin.show();
    ijf.main.gPopupFormHandle = dWin;
    ijf.main.renderForm(nfId, inAction.form, true, rItem);
},
renderCommentList:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;

    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";


    var outHtml = "";
    if(item.fields.comment.comments)
    {
		//sort desc
		var sortedCmnts = item.fields.comment.comments.sort(function(a, b)
		{
			a = new Date(a.created);
		    b = new Date(b.created);
		    return a>b ? -1 : a<b ? 1 : 0;
		});
		outHtml="<div class=ijfCommentList>";
			outHtml += "<div  class=ijfCommentListHead><div class=ijfCommentListHeadName>Comment</div><div class=ijfCommentListHeadAuthor>Author</div><div class=ijfCommentListHeadDate>Date</div></div>";
		outHtml = sortedCmnts.reduce(function(outHtml,a){
			outHtml += "<div class=ijfCommentListRow><div  class=ijfCommentListName>" + a.body.replace(/\n/g,"<br>") + "</div><div class=ijfCommentListAuthor>" + a.author.displayName + "</div><div class=ijfCommentListDate>" + moment(a.created).format('lll') + "</div></div>";
			return outHtml;
		},outHtml);
		outHtml+="</div>";
	}

    if(!l_Style) l_Style = l_panelStyle;
    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);

    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        items: {
            html: outHtml,
            frame: false,
            border: false,
            bodyStyle:  l_panelStyle,
            xtype: "panel"}
    });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl,inFormKey,item, inField, inContainer);
    pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);
}
,
renderAttchmentList:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;

    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";

	//sort desc
	var sortedAttachments = item.fields.attachment.sort(function(a, b)
	{
		a = new Date(a.created);
		b = new Date(b.created);
		return a>b ? -1 : a<b ? 1 : 0;
	});

    var outHtml = "<div class=ijfAttachList>";
		outHtml += "<div  class=ijfAttachListHead><div class=ijfAttachListHeadName>Name</div><div class=ijfAttachListHeadAuthor>Author</div><div class=ijfAttachListHeadDate>Date</div></div>";
    outHtml = sortedAttachments.reduce(function(outHtml,a){
		outHtml += "<div class=ijfAttachListRow><div  class=ijfAttachListName><a href='"+a.content+"' target='_blank'>" + a.filename + "</a></div><div class=ijfAttachListAuthor>" + a.author.displayName + "</div><div class=ijfAttachListDate>" + moment(a.created).format('lll') + "</div></div>";
		return outHtml;
	},outHtml);
	outHtml+="</div>";


    if(!l_Style) l_Style = l_panelStyle;
    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);

    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        items: {
            html: outHtml,
            frame: false,
            border: false,
            bodyStyle:  l_panelStyle,
            xtype: "panel"}
    });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl, inFormKey,item, inField, inContainer);
    pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);

}
,
renderHtml:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;
    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;

    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";


    var outHtml = ijfUtils.replaceKeyValues(inField.dataSource,item);
    outHtml = ijfUtils.sanitize(outHtml);
    if(!l_Style) l_Style = l_panelStyle;
    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);

    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        items: {
            html: outHtml,
            frame: false,
            border: false,
            bodyStyle:  l_panelStyle,
            xtype: "panel"}
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl,inFormKey,item, inField, inContainer);
    pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);

}
,
 renderFormButtons:function(inFormKey,item, inField, inContainer)
{
    inContainer.title = inField.toolTip;
    var lWidth = 'auto';
    if (inField.width!="")
    {
        lWidth= inField.width/1;
    }
    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);
    var l_save="Save";
    var l_reload="Reload";
    var l_done ="Done";
    var l_style = inField.style.split(",");
    if(l_style.length==3)
    {
        l_save=l_style[0];
        l_reload=l_style[1];
        l_done =l_style[2];
    }
    var lButtons = [];
    if(l_save)
    {

		lButtons.push({
			text:l_save,
			margin: '0 4 0 0',
			xtype:'button',
			style: inField.fieldStyle,
			handler: function(){
				if(inField.dataReference)
				{
					ijf.main.saveResultMessage = ijfUtils.replaceKeyValues(inField.dataReference,item);
				}
				else
				{
					ijf.main.saveResultMessage = null;
				}
				var onSuccessSave = function()
				{
					ijfUtils.hideProgress();
					if(ijf.main.saveResultMessage) ijfUtils.modalDialogMessage("Information",ijf.main.saveResultMessage);
					ijf.main.setAllClean();
					ijf.currentItem=ijfUtils.getJiraIssueSync(item.key);
					ijf.main.resetForm();
				};
				ijf.main.saveForm(onSuccessSave,null,inField.form,item);
			}});

    }
    if(l_reload)
    {
        lButtons.push( {
            text:l_reload,
            xtype:'button',
            style: inField.fieldStyle,
			margin: '0 4 0 0',
            handler: function(){
                if(window.onbeforeunload==null)
                {
                    ijf.main.resetForm();
                }
                else
                {
                    var dFunc = function(){
                        window.onbeforeunload= null;
                        ijf.main.resetForm();
                    };
                    ijfUtils.modalDialog("Warning",ijf.main.gNavigateOnChange,dFunc);
                }
            }});
    }
    if(l_done)
    {
        lButtons.push( {
            text:l_done,
            style: inField.fieldStyle,
            xtype:'button',
             handler: function(){
				//target form is dataSource if it exists or default form if it exists...
				var tForm="";
				if(ijf.fw.forms.hasOwnProperty(inField.dataSource))
				{
                     tForm=inField.dataSource;
				}
				else if(ijf.fw.forms.hasOwnProperty(inField.form.formSet.settings.defaultForm))
				{
					 tForm=inField.form.formSet.settings.defaultForm;
				}
				else
				{
					ijfUtils.modalDialogMessage("Information","Sorry but the done action needs a form or the form group needs a default form.");
					return;
				}

                if(window.onbeforeunload==null)
                {
                    ijf.main.renderForm("ijfContent", tForm, false, item);
                }
                else
                {
                    var dFunc = function(){
                        window.onbeforeunload= null;
	                    ijf.main.renderForm("ijfContent", tForm, false, item);
                    };
                    ijfUtils.modalDialog("Warning",ijf.main.gNavigateOnChange,dFunc);
                }
            }});
    }
    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";


    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        buttonAlign: 'left',
        layout: 'hbox',
        border:false,
        hidden: hideField,
        style: l_Style,
        bodyStyle: l_panelStyle,
        items: lButtons
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl,inFormKey,item, inField, inContainer);
    pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);

}
,
renderPopupFormButtons:function(inFormKey,item, inField, inContainer)
{
    inContainer.title = inField.toolTip;
    var lWidth = 'auto';
    if (inField.width!="")
    {
        lWidth= inField.width/1;
    }
    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);
    var l_save="Save";
    var l_reload="Save/Done";
    var l_done ="Done";
    var l_style = inField.style.split(",");
    if(l_style.length==3)
    {
        l_save=l_style[0];
        l_reload=l_style[1];
        l_done =l_style[2];
    }
    var lButtons = [];
    if(l_save)
    {
		lButtons.push({
			text:l_save,
			margin: '0 4 0 0',
			xtype:'button',
			inField: inField,
			handler: function(){

				//if you are saving and ADD form it can only save ONE time
				//then it has to shift to an edit mode....

				if(inField.dataReference)
				{
					ijf.main.saveResultMessage = ijfUtils.replaceKeyValues(inField.dataReference,item);
				}
				else
				{
					ijf.main.saveResultMessage = null;
				}
				var onSuccessSave = function()
				{
					ijfUtils.hideProgress();
					ijf.main.setAllClean();
					//now change item to be the new loaded item....
					item = ijfUtils.getJiraIssueSync(ijf.main.itemId);
					if(ijf.main.saveResultMessage) ijfUtils.modalDialogMessage("Information",ijf.main.saveResultMessage);
				};
				//IF ijf.main.parentItemId is not null and we are adding
				//a subtask...then we need to set the parent ID in the fields prior to save.  initialize here...
				var fields = null;
				if(ijf.main.parentItemId)
				{
					fields = {};
					fields.parent={"key":ijf.main.parentItemId};
				}

				ijf.main.saveForm(onSuccessSave,fields, this.inField.form, item);
			}});
    }
    if(l_reload)
    {
        lButtons.push( {
            text:l_reload,
            xtype:'button',
			margin: '0 4 0 0',
			inField: inField,
            handler: function(){
				if(ijf.main.allControlsClean())
				{
					ijf.main.gPopupFormHandle.close();
                    ijf.main.gPopupFormHandle=null;
                    return;
				}
				if(inField.dataReference)
				{
					ijf.main.saveResultMessage = ijfUtils.replaceKeyValues(inField.dataReference,item);
				}
				else
				{
					ijf.main.saveResultMessage = null;
				}
				var onSuccessSave = function()
				{
					ijfUtils.hideProgress();
					ijf.main.setAllClean();
					if(ijf.main.saveResultMessage) ijfUtils.modalDialogMessage("Information",ijf.main.saveResultMessage);
                    ijf.main.gPopupFormHandle.close();
                    ijf.main.gPopupFormHandle=null;
				};
				//IF ijf.main.parentItemId is not null and we are adding
				//a subtask...then we need to set the parent ID in the fields prior to save.  initialize here...
				var fields = null;
				if(ijf.main.parentItemId)
				{
					fields = {};
					fields.parent={"key":ijf.main.parentItemId};
				}
			    ijf.main.saveForm(onSuccessSave,fields, this.inField.form, item);
			}});
    }
    if(l_done)
    {
        lButtons.push( {
            text:l_done,
            xtype:'button',
			margin: '0 4 0 0',
            handler: function(){
                if(ijf.main.gPopupFormHandle)
                {
                    ijf.main.gPopupFormHandle.close();
                    ijf.main.gPopupFormHandle=null;
                }
            }});
    }
    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;

    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";

    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        buttonAlign: 'left',
        layout: 'hbox',
        border:false,
        hidden: hideField,
        style: l_Style,
        bodyStyle: l_panelStyle,
        items: lButtons
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl,inFormKey,item, inField, inContainer);
   pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);

}

,
renderNavigateToForm:function(inFormKey,item, inField, inContainer)
{


    inContainer.title = inField.toolTip;
    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;



    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";


    var hideField = ijfUtils.renderIfShowField("",inField);

    var hFunction = function(){
        //need to get the id of the form...iterate from fw.
        var targetForm = ijfUtils.replaceKeyValues(inField.dataSource,item);
        var thisForm = ijf.fw.forms[targetForm];

        if(thisForm==null)
        {
            ijfUtils.modalDialogMessage("Error Message", "Unable to find form " +targetForm)
        }
        else
        {
            if(window.onbeforeunload==null)
            {
				window.g_formId=targetForm;
                ijf.main.renderForm("ijfContent", targetForm, false, item);
            }
            else
            {
				var dFunc = function(){
					window.onbeforeunload= null;
					window.g_formId=targetForm;
					ijf.main.renderForm("ijfContent", targetForm, false, item);
				};
				ijfUtils.modalDialog("Warning",ijf.main.gNavigateOnChange,dFunc);
            }
        }
    };
    if(l_labelStyle=="link")
    {
        var pnl = new Ext.FormPanel({
            labelAlign: 'left',
            border:false,
            hidden:hideField,
            style: l_Style,
            bodyStyle: l_panelStyle,
            items: {
                xtype: 'simplelink',
                text: inField.caption,
                style: l_fieldStyle,
                handler: hFunction
            }
        });
    }
    else
    {
        var bPressed = false;
        if(window.g_formId == ijfUtils.replaceKeyValues(inField.dataSource,item)) bPressed = true;
        var pnl = new Ext.FormPanel({
            buttonAlign: 'center',
            layout:'hbox',
            labelAlign: 'left',
            border:false,
            hidden: hideField,
            style: l_Style,
            bodyStyle: l_panelStyle,
            items:[{
				xtype: 'button',
                text:inField.caption,
                pressed: bPressed,
                style: l_fieldStyle,
                handler: hFunction
            }
            ]
        });
    }
    	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl,inFormKey,item, inField, inContainer);
    pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);

},
renderAttachmentUpload:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var data = null;

    var lAllowBlank = true;

    var lValidator = function(v){return true};
    var lRegex =  inField.regEx;
    if((lRegex!=null) && (lRegex!=""))
    {
        lValidator = function(v)
        {
            var rgx = new RegExp(lRegex);
            if (!rgx.exec(v)) {
                return inField.regExMessage;
            }
            return true;
        }
    }
    var hideField = ijfUtils.renderIfShowField(data,inField);
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;

    if(!l_fieldStyle) l_fieldStyle="width:100px;background:transparent";
	if(rOnly) l_fieldStyle="background:lightgray";

    var ocf =  ijfUtils.getEvent(inField);
	var fileLoad = "<form enctype='multipart/form-data' id='attachmentUploadFormId'><input id='attachmentUploadFileId' type='file' name='file' onChange=ijf.main.controlChanged('"+inFormKey+"_fld_"+inField.formCell+"');Ext.get('attachmentFileDisplayId').update(this.value);></form>";
    var simple = new Ext.FormPanel({
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        items:[{
            xtype: 'button',
            labelStyle: l_labelStyle,
            style: l_panelStyle,
            fieldLabel: 'ccc',
            hideLabel:  hideLabel,
            allowBlank: true,
            validator: lValidator,
            text: lCaption,
            readOnly: rOnly,
            id: inFormKey+'_ctr_'+inField.formCell.replace(",","_"),
            listeners: {
                click: function(f,n,o){
					jQuery('#attachmentUploadFileId').trigger('click');
                }
            }
        },{
            html: "None selected",
            id: "attachmentFileDisplayId",
            frame: false,
            border: false,
            bodyStyle:  l_fieldStyle,
            xtype: "panel"},
           {
            html: fileLoad,
            frame: false,
            hidden: true,
            border: false,
            xtype: "panel"}
    	]
    });

    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);

}
,
renderTextbox:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

	var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
    var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
	var jf=item.fields[jfFieldDef.id];
    var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);

	    var lAllowBlank = true;
	    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;

    var lMaxsize =  Number.MAX_VALUE;

    var lValidator = function(v){return true};
    var lRegex =  inField.regEx;
    if((lRegex!=null) && (lRegex!=""))
    {
        lValidator = function(v)
        {
            var rgx = new RegExp(lRegex);
            if (!rgx.exec(v)) {
                return inField.regExMessage;
            }
            return true;
        }
    }
    var hideField = ijfUtils.renderIfShowField(data,inField);
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";
	if(rOnly) l_fieldStyle="background:lightgray";

    var ocf =  ijfUtils.getEvent(inField);

    var simple = new Ext.FormPanel({
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        items:[{
            xtype: 'textfield',
            labelAlign: 'left',
            //labelWidth: labelWidth,
            labelStyle: l_labelStyle,
            style: l_panelStyle,
            fieldStyle: l_fieldStyle,
            fieldLabel: lCaption,
            hideLabel:  hideLabel,
            allowBlank: lAllowBlank,
            maxLength: lMaxsize,
            validator: lValidator,
            readOnly: rOnly,
            //width: lWidth,
            value: data,
            id: inFormKey+'_ctr_'+inField.formCell.replace(",","_"),
            listeners: {
                afterrender: function(f)
                {
                    this.validate();
                },
                valid: function(f)
                {
                    inContainer.title = inField.toolTip;
                },
                invalid: function(f,msg){
                    if(!inField.toolTip) inContainer.title = f.getErrors().join();
                },
                change: function(f,n,o){
                    ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
                    if(f.isValid())
                    {
                        ocf(f,n,o);
                    }
                }
            }
        }]
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
renderTabmenu:function(inFormKey,item, inField, inContainer)
{

    var tabs = JSON.parse(inField.dataSource);

	    var l_labelStyle = inField.labelStyle;
	    var l_panelStyle = inField.panelStyle;
	    var l_Style = inField.style;
	    var l_fieldStyle = inField.fieldStyle;

    var tbs = [];
    var lactiveTab = null;

    for(var t in tabs)
    {
        if(!tabs.hasOwnProperty(t)) continue;
        tbs.push({id: t,
                  title: tabs[t][0],
                  style: l_fieldStyle,
                  targetFormName: tabs[t][1]});
        if(tabs[t][1]==ijf.main.outerForm.name)
        {
            lactiveTab =t;
        }
    }
    var simple = new Ext.TabPanel({
        activeTab: lactiveTab,
        items: tbs,
        style: l_Style,
        bodyStyle: l_panelStyle,
        jField: inField,
        frame: false,
        border: false,
        listeners: {
            tabchange: function(tg,t){
                //navigate to target...
                //alert(t.targetFormName);

                if(t.targetFormName!=ijf.main.outerForm.name)
                {
					if(t.targetFormName.indexOf("snippet:")>-1)
					{
						//snippet call...
						var tSnippet = t.targetFormName.replace("snippet:","");
						ijf.main.gEventControl=this.jField;
						try
						{
							var outVal = ijf.snippets[tSnippet](this.jField);
							ijfUtils.footLog("field event returned " + outVal);
						}
						catch(e)
						{
							ijfUtils.footLog("field event failed: " + e.message);
						}
					}
					else
					{
						var thisForm = ijf.fw.forms[t.targetFormName];
						if(thisForm==null)
						{
							ijfUtils.modalDialogMessage("Error Message", "Unable to find form " + t.targetFormName)
						}
						else
						{
							if(window.onbeforeunload==null)
							{
								ijfUtils.clearExt();
								window.g_formId=t.targetFormName;
								ijf.main.renderForm("ijfContent", t.targetFormName, false, item);
							}
							else
							{
								var dFunc = function(){
									window.onbeforeunload= null;
									ijfUtils.clearExt();
									window.g_formId=t.targetFormName;
									ijf.main.renderForm("ijfContent", t.targetFormName, false, item);
								};
								ijfUtils.modalDialog("Warning",ijf.main.gNavigateOnChange,dFunc);
							}
						}
					}
                }
            }
        }
    });
	 //before render....
	 if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
        //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
renderDatebox:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

	var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
    var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
	var jf=item.fields[jfFieldDef.id];
    var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);

	    var lAllowBlank = true;
	    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;

	    var lValidator = function(v){return true};
	    var lRegex =  inField.regEx;
	    if((lRegex!=null) && (lRegex!=""))
	    {
	        lValidator = function(v)
	        {
	            var rgx = new RegExp(lRegex);
	            if (!rgx.exec(v)) {
	                return inField.regExMessage;
	            }
	            return true;
	        }
	    }


    var hideField = ijfUtils.renderIfShowField(data,inField);
	  var hideLabel = false;
	  if (inField.caption=="")
		  var lCaption = inField.dataSource;
	  else if(inField.caption=="none")
	  {
		  var lCaption = "";
		  hideLabel=true;
	  }
	  else
		var lCaption = inField.caption;


    var d = null;
    try
    {
        var tics = Date.parse(data);
        if (isNaN(tics))
        {
            d = null;
        }
        else
        {
            d = new Date(tics);
        }
    }
    catch(e)
    {d = null;}


    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;

    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;

    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }


	    var l_labelStyle = inField.labelStyle;
	    var l_panelStyle = inField.panelStyle;
	    var l_Style = inField.style;
	    var l_fieldStyle = inField.fieldStyle;


	    if(!l_labelStyle) l_labelStyle="background:transparent";
	    if(!l_panelStyle) l_panelStyle="background:transparent";
	    if(!l_Style) l_Style="background:transparent";
	    if(!l_fieldStyle) l_fieldStyle="background:white";
		if(rOnly) l_fieldStyle="background:lightgray";

    var ocf =  ijfUtils.getEvent(inField);
    var simple = new Ext.FormPanel({
        border:false,
        hidden: hideField,
        width: 'auto',
        bodyStyle: l_Style,
        items:[{
            xtype: 'datefield',
            labelStyle: l_labelStyle,
            style: l_panelStyle,
            fieldStyle: l_fieldStyle,
            fieldLabel: lCaption,
            hideLabel:  hideLabel,
            allowBlank: lAllowBlank,
            validator: lValidator,
            readOnly: rOnly,
            value: d,
            invalidText: "Date must be in format mm/dd/yyyy",
            id: inFormKey+'_ctr_'+ inField.formCell.replace(",","_"),
            listeners: {
                afterrender: function(f)
                {
                    this.validate();
                },
                valid: function(f)
                {
                    inContainer.title = inField.toolTip;
                },
                invalid: function(f,msg){
                    if(!inField.toolTip) inContainer.title = f.getErrors().join();
                },
                change: function(f,n,o){
                    ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
                    if(f.isValid())
                    {
                        ocf(f,n,o);
                    }
                }
            }
        }]
    });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);
    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
 renderDropdown:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
	var jf=item.fields[jfFieldDef.id];
    var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);

	//if status, the transitions are the field meta...
	if(jfFieldDef.schema.type=='status')
	{
		//cache this?
		if(!item.transitions)
		{
			item.transitions= ijfUtils.jiraApiSync('GET','/rest/api/2/issue/'+item.key+'/transitions', null);
		}
		var jfFieldMeta = item.transitions;
	}
	else
	{
		var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
	}

    var lAllowBlank = true;
    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;


    //manage cases for the lookups
    //case one, simple collect constraint
    //case two reference lookup
    switch (inField.dataReference)
    {
        case "ijfReference":
            var ref = JSON.parse(inField.referenceFilter);
            //value only for now...
            if((ref.filter) && (ref.filter!="")) ref.filter.value = ijfUtils.replaceKeyValues(ref.filter.value,item);
            var lookup = fw.getReferenceItemsAsSimpleArray(ref.entity,ref.field,ref.filter);
            break;
        default:

			switch(jfFieldDef.schema.type)
			{
				case "priority":
					var lookup = jfFieldMeta.allowedValues.map(function(e)
					{
							return [e.id,e.name];
					});
					break;
				case "status":
					var lookup = jfFieldMeta.transitions.map(function(e)
					{
							return [e.id,e.name];
					});
					lookup.push([data,item.fields.status.name]);
					break;
				case "option":
					var lookup = jfFieldMeta.allowedValues.map(function(e)
					{
							return [e.id,e.value];
					});
					break;
				default:
					var lookup = [];
					ijfUtils.footLog("No options found for schema: " + jfFieldDef.schema.type);
			}
     		break;
    }

    var hideField = ijfUtils.renderIfShowField(data,inField);
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

    var limitList = true;
    if (inField.style.indexOf('limit:false')>-1)
    {
        limitList=false;
    }

    var ocf =  ijfUtils.getEvent(inField);

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";
	if(rOnly) l_fieldStyle="background:lightgray";


    var simple = new Ext.FormPanel({
        hidden: hideField,
        border:false,
        bodyStyle: l_Style,
        items:[{xtype: 'combobox',
            store: lookup,
			labelAlign: 'left',
			labelStyle: l_labelStyle,
			style: l_panelStyle,
			fieldStyle: l_fieldStyle,
			fieldLabel: lCaption,
			hideLabel: hideLabel,
			allowBlank: lAllowBlank,
			readOnly: rOnly,
			value: data,
			forceSelection: limitList,
			triggerAction: 'all',
			emptyText:'Please select...',
			selectOnFocus:true,
			id: inFormKey+'_ctr_'+inField.formCell.replace(",","_"),
			listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
					ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
					ocf(f,n,o);
				}
			}}]
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
},


renderUserPicker:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

	var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
    var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
	var jf=item.fields[jfFieldDef.id];

    var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);

    var lAllowBlank = true;
    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;


    //manage cases for the lookups
    //case one, simple collect constraint
    //case two reference lookup
    switch (inField.dataReference)
    {
        case "ijfReference":
            var ref = JSON.parse(inField.referenceFilter);
            //value only for now...
            if((ref.filter) && (ref.filter!="")) ref.filter.value = ijfUtils.replaceKeyValues(ref.filter.value,item);
            var lookup = fw.getReferenceItemsAsSimpleArray(ref.entity,ref.field,ref.filter);
            break;
        default:


            var apiUrl = "/rest/api/2/user/assignable/search";
            if(inField.controlType="userpicker") apiUrl = "/rest/api/2/user/search";


     		Ext.define('JiraUserModel', {
			        extend: 'Ext.data.Model',
			        fields: [{name:'name', type: 'string'},
			                 {name: 'displayName', type: 'string'}]
    		});
			var lookup = Ext.create('Ext.data.Store', {
				storeId: 'userDropdownId',
				model: 'JiraUserModel',
				autoLoad: true,
				proxy: {
					type: 'ajax',
					url: g_root + "/rest/api/2/user/assignable/search",
					extraParams : {
								issueKey:'TPO-1'},
					filterParam: 'username',
					groupParam: '',
					limitParam: '',
					pageParam: '',
					sortParam: '',
					startParam: '',
					reader: {
						type: 'json',
						root: ''
					}
				}
		    });
     		break;
    }

    var hideField = ijfUtils.renderIfShowField(data,inField);
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

    var limitList = true;
    if (inField.style.indexOf('limit:false')>-1)
    {
        limitList=false;
    }

    var ocf =  ijfUtils.getEvent(inField);

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";
	if(rOnly) l_fieldStyle="background:lightgray";


    var simple = new Ext.FormPanel({
        hidden: hideField,
        border:false,
        bodyStyle: l_Style,
        items:[{xtype: 'combobox',
            store: lookup,
            displayField: 'displayName',
            valueField: 'name',
			labelAlign: 'left',
			labelStyle: l_labelStyle,
			style: l_panelStyle,
			fieldStyle: l_fieldStyle,
			fieldLabel: lCaption,
			hideLabel: hideLabel,
			allowBlank: lAllowBlank,
			readOnly: rOnly,
			value: data,
			forceSelection: limitList,
			hideTrigger: true,
			triggerAction: 'all',
			queryMode: 'remote',
			queryParam: 'username',
			minChars: 2,
			emptyText:'Start typing...',
			selectOnFocus:true,
			id: inFormKey+'_ctr_'+inField.formCell.replace(",","_"),
			listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
					if(!n) return;
					ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
					ocf(f,n,o);
				}
			}}]
    });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
        //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
renderMultiselect:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

	var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
    var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
	var jf=item.fields[jfFieldDef.id];
    var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);

    var lAllowBlank = true;
    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;


    //manage cases for the lookups
    //case one, simple collect constraint
    //case two reference lookup
    switch (inField.dataReference)
    {
        case "ijfReference":
            var ref = JSON.parse(inField.referenceFilter);
            //value only for now...
            if((ref.filter) && (ref.filter!="")) ref.filter.value = ijfUtils.replaceKeyValues(ref.filter.value,item);
            var lookup = fw.getReferenceItemsAsSimpleArray(ref.entity,ref.field,ref.filter);
            break;
        default:

			if((jfFieldDef.schema.system=="components")
				|| (jfFieldDef.schema.system=="versions")
				|| (jfFieldDef.schema.system=="fixVersions"))
			{
				var lookup = jfFieldMeta.allowedValues.map(function(e)
				{
						return {id: e.id, show: e.name};
				});
				var cValue = [];
				if(data) cValue = data.map(function(cv){return cv.id});
				var shows = Ext.create('Ext.data.Store', {
				  fields: ['id','show'],
				  data: lookup
				});
			}
			else
			{
				var lookup = jfFieldMeta.allowedValues.map(function(e)
				{
						return {id: e.id, show: e.value};
				});
				var cValue = [];
				if(data) cValue = data.map(function(cv){return cv.id});
				var shows = Ext.create('Ext.data.Store', {
				  fields: ['id','show'],
				  data: lookup
				});
			}
     		break;
    }

    var hideField = ijfUtils.renderIfShowField(data,inField);
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

    var limitList = true;
    if (inField.style.indexOf('limit:false')>-1)
    {
        limitList=false;
    }

    var ocf =  ijfUtils.getEvent(inField);

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";
	if(rOnly) l_fieldStyle="background:lightgray";


    var simple = new Ext.FormPanel({
        hidden: hideField,
        border:false,
        bodyStyle: l_Style,
        items:[{xtype: 'tagfield',
            store: shows,
            filterPickList: true,
			labelStyle: l_labelStyle,
			style: l_panelStyle,
			fieldStyle: l_fieldStyle,
			fieldLabel: lCaption,
			hideLabel: hideLabel,
			allowBlank: lAllowBlank,
			readOnly: rOnly,
			valueField: 'id',
			displayField: 'show',
			value: cValue,
			queryMode: 'local',
			//forceSelection: limitList,
			triggerAction: 'all',
			emptyText:'Please select...',
			selectOnFocus:true,
			id: inFormKey+'_ctr_'+inField.formCell.replace(",","_"),
			listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
					ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
					ocf(f,n,o);
				}
			}}]
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
renderRadiogroup:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
	var jf=item.fields[jfFieldDef.id];
    var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);

	//if status, the transitions are the field meta...
	if(jfFieldDef.schema.type=='status')
	{
		//cache this?
		if(!item.transitions)
		{
			item.transitions= ijfUtils.jiraApiSync('GET','/rest/api/2/issue/'+item.key+'/transitions', null);
		}
		var jfFieldMeta = item.transitions;
	}
	else
	{
		var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
	}

    var lAllowBlank = true;
    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

	var ocf =  ijfUtils.getEvent(inField);

	var l_labelStyle = inField.labelStyle;
	var l_panelStyle = inField.panelStyle;
	var l_Style = inField.style;
	var l_fieldStyle = inField.fieldStyle;


	if(!l_labelStyle) l_labelStyle="background:transparent";
	if(!l_panelStyle) l_panelStyle="background:transparent";
	if(!l_Style) l_Style="background:transparent";
	if(!l_fieldStyle) l_fieldStyle="background:transparent; margin: 0 10 0 0";
	if(rOnly) l_fieldStyle="background:lightgray";


     var cColumns = ijfUtils.getNameValueFromStyleString(l_fieldStyle,'columns');
      if(!cColumns) cColumns = 2;


		switch(jfFieldDef.schema.type)
		{
			case "priority":
				var rOptions= jfFieldMeta.allowedValues.map(function(e)
				{
								return {id: "radio_" + jfFieldDef.id + "_" + e.id,
										boxLabel: e.name,
										value : (data==e.id) ?  true : false,
										style: l_fieldStyle,
										readOnly: rOnly,
										name: jfFieldDef.id,
										inputValue: e.id};
				 });
				break;
			case "status":
				var rOptions= jfFieldMeta.transitions.map(function(e)
				{
								return {id: "radio_" + jfFieldDef.id + "_" + e.id,
										boxLabel: e.name,
										value :  false,
										style: l_fieldStyle,
										name: jfFieldDef.id,
										readOnly: rOnly,
										inputValue: e.id};
				});
				rOptions.push({id: "radio_" + jfFieldDef.id + "_" + data,
										boxLabel: item.fields.status.name,
										value : true,
										style: l_fieldStyle,
										readOnly: rOnly,
										name: jfFieldDef.id,
										inputValue: data});
				break;
			case "option":
				var rOptions= jfFieldMeta.allowedValues.map(function(e)
				{
								return {id: "radio_" + jfFieldDef.id + "_" + e.id,
										boxLabel: e.value,
										value : (data==e.id) ?  true : false,
										style: l_fieldStyle,
										readOnly: rOnly,
										name: jfFieldDef.id,
										inputValue: e.id};
				 });
				break;
			default:
				var rOptions = [];
				ijfUtils.footLog("No options found for schema: " + jfFieldDef.schema.type);
		}

    var ocf =  ijfUtils.getEvent(inField);
    var hideField = ijfUtils.renderIfShowField(data,inField);



    var simple = new Ext.FormPanel({
        hidden: hideField,
        border:false,
        bodyStyle: l_Style,
        items:[{xtype: 'radiogroup',
			labelAlign: 'left',
			labelStyle: l_labelStyle,
			style: l_panelStyle,
  			columns: cColumns,
			fieldLabel: lCaption,
			hideLabel: hideLabel,
			allowBlank: lAllowBlank,
			readOnly: rOnly,
			selectOnFocus:true,
			id: inFormKey+'_ctr_'+inField.formCell.replace(",","_"),
			items: rOptions,
			listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
					ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
					ocf(f,n,o);
				}
			}}]
    });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, inFormKey,item, inField, inContainer);
    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
renderCheckbox:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

  	var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
      var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
  	var jf=item.fields[jfFieldDef.id];

      var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);

      var lAllowBlank = true;
      if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;

      var hideLabel = false;
      if (inField.caption=="")
          var lCaption = inField.dataSource;
      else if(inField.caption=="none")
      {
          var lCaption = "";
          hideLabel=true;
      }
      else
          var lCaption = inField.caption;
      if (inField.style.indexOf('hidden:true')>-1)
      {
          hideLabel=true;
          hideField=true;
      }
      var rOnly = false;
      if (inField.fieldStyle.indexOf('readonly:true')>-1)
      {
          rOnly=true;
      }
      if (inField.style.indexOf('enteronce:true')>-1)
      {
          if (!!data) rOnly=true;
      }

  	var ocf =  ijfUtils.getEvent(inField);

  	var l_labelStyle = inField.labelStyle;
  	var l_panelStyle = inField.panelStyle;
  	var l_Style = inField.style;
  	var l_fieldStyle = inField.fieldStyle;


  	if(!l_labelStyle) l_labelStyle="background:transparent";
  	if(!l_panelStyle) l_panelStyle="background:transparent";
  	if(!l_Style) l_Style="background:transparent";
  	if(!l_fieldStyle) l_fieldStyle="background:transparent; margin: 0 10 0 0";
  	if(rOnly) l_fieldStyle="background:lightgray";


      var cColumns = ijfUtils.getNameValueFromStyleString(l_fieldStyle,'columns');
      if(!cColumns) cColumns = 2;

      var getChecked = function(inId)
      {
		  var retVal = false;
		  if(data) data.forEach(function(c){if(c.id==inId) retVal=true});
		  return retVal;
	  }

      var rOptions= jfFieldMeta.allowedValues.map(function(e)
      {
  			     	return {id: "check_" + jfFieldDef.id + "_" + e.id,
  			     			boxLabel: e.value,
  			     			value : getChecked(e.id),
       						style: l_fieldStyle,
  			     			name: jfFieldDef.id,
  			     			readOnly: rOnly,
  			     			inputValue: e.id};
       });

      var ocf =  ijfUtils.getEvent(inField);
      var hideField = ijfUtils.renderIfShowField(data,inField);



      var simple = new Ext.FormPanel({
          hidden: hideField,
          border:false,
          bodyStyle: l_Style,
          items:[{xtype: 'checkboxgroup',
  			labelStyle: l_labelStyle,
  			style: l_panelStyle,
  			columns: cColumns,
  			fieldLabel: lCaption,
  			hideLabel: hideLabel,
  			allowBlank: lAllowBlank,
  			selectOnFocus:true,
  			id: inFormKey+'_ctr_'+inField.formCell.replace(",","_"),
  			items: rOptions,
  			listeners: {
  				afterrender: function(f)
  				{
  					this.validate();
  				},
  				change: function(f,n,o){
  					ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
  					ocf(f,n,o);
  				}
  			}}]
      });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);

      simple.render(inContainer);
      var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
 renderButtonLink:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var hideField = ijfUtils.renderIfShowField(null,inField);

    var lCaption = inField.caption;

    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideField=true;
    }

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    //if(!l_labelStyle) l_labelStyle="background:transparent";
    //if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    //if(!l_fieldStyle) l_fieldStyle="background:white";

    var ocf =  ijfUtils.getEvent(inField);

    var xType = "button";
    if(l_labelStyle=="link") xType="simplelink";

        var simple = new Ext.FormPanel({
            border:false,
            hidden:hideField,
            bodyStyle: l_Style,
            jField: inField,
            items: {
                xtype: xType,
                text: lCaption,
                style: l_panelStyle,
               handler: function(){
			                   var url =ijfUtils.replaceKeyValues(inField.dataSource,item);
			                   window.open(url);
            	}
            }
        });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, item, inField, inContainer);

	simple.render(inContainer);
	var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
 renderBlankbutton:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var hideField = ijfUtils.renderIfShowField(null,inField);

    var lCaption = inField.caption;

    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideField=true;
    }

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    //if(!l_labelStyle) l_labelStyle="background:transparent";
    //if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    //if(!l_fieldStyle) l_fieldStyle="background:white";

    var ocf =  ijfUtils.getEvent(inField);

    var xType = "button";
    if(l_labelStyle=="link") xType="simplelink";

        var simple = new Ext.FormPanel({
            border:false,
            hidden:hideField,
            bodyStyle: l_Style,
            jField: inField,
            items: {
                xtype: xType,
                text: lCaption,
                style: l_panelStyle,
                handler: function(){
					ijf.main.gEventControl=this.up().jField;
                    ocf();
                }
            }
        });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, item, inField, inContainer);

	simple.render(inContainer);
	var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
 renderPopFormButton:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;
    if (inField.caption=="")
        var lCaption = inField.controlType;
    else
        var lCaption = inField.caption;

	var l_labelStyle = inField.labelStyle;
	var l_panelStyle = inField.panelStyle;
	var l_Style = inField.style;
	var l_fieldStyle = inField.fieldStyle;

	if(!l_Style) l_Style="background:transparent";

    var hideField = ijfUtils.renderIfShowField("",inField);

    var ocf =  ijfUtils.getEvent(inField);

	var aWidth = ijfUtils.getNameValueFromStyleString(inField.panelStyle,"width");
	var aHeight = ijfUtils.getNameValueFromStyleString(inField.panelStyle,"height");
	var aTitle = ijfUtils.getNameValueFromStyleString(inField.panelStyle,"title");

	if(aWidth)
	{
		aWidth = aWidth.replace("px","").replace("%","")/1;
	}
	else
	{
		aWidth=300;
	}
	if(aHeight)
	{
		aHeight = aHeight.replace("px","").replace("%","")/1;
	}
	else
	{
		aHeight=300;
	}
    var xType = "button";
    if(l_labelStyle=="link") xType="simplelink";
    var simple = new Ext.FormPanel({
            border:false,
            hidden:hideField,
            bodyStyle: l_Style,
            jField: inField,
            items: {
                xtype: xType,
                text: lCaption,
                handler: function(){
                    var action = {};
                    action.form = inField.dataSource;
                    //action.title = aTitle;
                    //action.width = aWidth;
                    //action.height = aHeight;
                    action.type = inField.dataReference;
                    //action.fieldStyle = inField.fieldStyle;
                    action.inField = inField;
                    ijf.extUtils.renderPopupForm(inFormKey,item,action)
                }
            }
        });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);

	simple.render(inContainer);
	var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
 renderTextarea:function(inFormKey,item, inField, inContainer)
{

    var collapsible = false;
    if (inField.style.indexOf('collapsible:true')>-1)
    {
        collapsible=true;
    }
    var collapsed = false;
    if (inField.style.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }

    var panelTitle = "";
    if (inField.style.indexOf('panelTitle:')>-1)
    {
        panelTitle = inField.style.substr(inField.style.indexOf('panelTitle:')+11);
        var tPt = panelTitle.split(";");
        panelTitle=tPt[0];
    }

    inContainer.title = inField.toolTip;

	var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
    var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
	var jf=item.fields[jfFieldDef.id];
    var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);

	    var lAllowBlank = true;
	    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;

	    var lMaxsize =  Number.MAX_VALUE;

	    var lValidator = function(v){return true};
	    var lRegex =  inField.regEx;
	    if((lRegex!=null) && (lRegex!=""))
	    {
	        lValidator = function(v)
	        {
	            var rgx = new RegExp(lRegex);
	            if (!rgx.exec(v)) {
	                return inField.regExMessage;
	            }
	            return true;
	        }
	    }
	    var hideField = ijfUtils.renderIfShowField(data,inField);
	    var hideLabel = false;
	    if (inField.caption=="")
	        var lCaption = inField.dataSource;
	    else if(inField.caption=="none")
	    {
	        var lCaption = "";
	        hideLabel=true;
	    }
	    else
	        var lCaption = inField.caption;
	    if (inField.style.indexOf('hidden:true')>-1)
	    {
	        hideLabel=true;
	        hideField=true;
	    }
	    var rOnly = false;
	    if (inField.fieldStyle.indexOf('readonly:true')>-1)
	    {
	        rOnly=true;
	    }
	    if (inField.style.indexOf('enteronce:true')>-1)
	    {
	        if (!!data) rOnly=true;
	    }

	    var l_labelStyle = inField.labelStyle;
	    var l_panelStyle = inField.panelStyle;
	    var l_Style = inField.style;
	    var l_fieldStyle = inField.fieldStyle;


	    if(!l_labelStyle) l_labelStyle="background:transparent";
	    if(!l_panelStyle) l_panelStyle="background:transparent";
	    if(!l_Style) l_Style="background:transparent";
	    if(!l_fieldStyle) l_fieldStyle="background:white";
		if(rOnly) l_fieldStyle="background:lightgray";


		var collapsible = false;
		if (inField.style.indexOf('collapsible:true')>-1)
		{
			collapsible=true;
		}
		var collapsed = false;
		if (inField.style.indexOf('collapsed:true')>-1)
		{
			collapsed=true;
		}

		var panelTitle = "";
		if (inField.style.indexOf('panelTitle:')>-1)
		{
			panelTitle = inField.style.substr(inField.style.indexOf('panelTitle:')+11);
			var tPt = panelTitle.split(";");
			panelTitle=tPt[0];
		}

	    var ocf =  ijfUtils.getEvent(inField);

	    var simple = new Ext.FormPanel({
	        border:false,
	        hidden: hideField,
	        collapsible: collapsible,
	        collapsed: collapsed,
	        title: panelTitle,
	        width: 'auto',
	        bodyStyle: l_Style,
	        items:[{
	            xtype: 'textarea',
	            labelAlign: 'left',
	            //labelWidth: labelWidth,
	            labelStyle: l_labelStyle,
	            style: l_panelStyle,
	            fieldStyle: l_fieldStyle,
	            fieldLabel: lCaption,
	            hideLabel:  hideLabel,
	            allowBlank: lAllowBlank,
	            maxLength: lMaxsize,
	            validator: lValidator,
	            readOnly: rOnly,
	            //width: lWidth,
	            value: data,
	            id: inFormKey+'_ctr_'+inField.formCell.replace(",","_"),
	            listeners: {
	                afterrender: function(f)
	                {
	                    this.validate();
	                },
	                valid: function(f)
	                {
	                    inContainer.title = inField.toolTip;
	                },
	                invalid: function(f,msg){
	                    if(!inField.toolTip) inContainer.title = f.getErrors().join();
	                },
	                change: function(f,n,o){
	                    ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
	                    if(f.isValid())
	                    {
	                        ocf(f,n,o);
	                    }
	                }
	            }
	        }]
	    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);

	    simple.render(inContainer);
	    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
 renderComments:function(inFormKey,item, inField, inContainer)
{
    inContainer.title = inField.toolTip;
    var origDatasource = inField.dataSource;
    var mappedField=null;
    if(gSubformParams)
    {
        if(gSubformParams.hasOwnProperty(inField.dataSource))
        {
            inField.dataSource=gSubformParams[inField.dataSource];
            mappedField = inField.dataSource;
        }
    }
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
    }
    else
        var lCaption = inField.caption;
    var hideField = ijfUtils.renderIfShowField("",inField);
    var lWidth = 'auto';
    if (inField.width!="")
    {
        lWidth= inField.width/1;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    var l_labelStyle = mwfUtils_getStyle(inField.labelStyle);
    var l_panelStyle = mwfUtils_getStyle(inField.panelStyle);
    var l_Style = mwfUtils_getStyle(inField.style);
    var cData = item.getSectionTableObjData(inField.dataSource);
    if(cData)
    {
        cData.reverse();
    }
    else
    {
        cData = [];
    }
    var cHtml = "<u>Comment Log</u><br>" +
        "<table>";
    var moreComments = "<table>";
    var cCount = 0;
    for(var ll in cData)
    {
        if(!cData.hasOwnProperty(ll)) continue;
        if(cData[ll].datetime==null) continue;
        if(cCount<3)
        {
            cHtml+= "<tr>" +
                "<td colspan=2 style='font-style: italic'>On "+ cData[ll].datetime +", "+ cData[ll].author +" commented:</td></tr>" +
                "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;</td></td><td>"+ mwfUtil_removeTags(cData[ll].comment) +"<br></td></tr>" +
                "<tr><td colspan=2>&nbsp;</td></tr></tr>";
        }
        else
        {
            moreComments += "<tr>" +
                "<td colspan=2 style='font-style: italic'>On "+ cData[ll].datetime +", "+ cData[ll].author +" commented:</td></tr>" +
                "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;</td></td><td>"+ mwfUtil_removeTags(cData[ll].comment) +"<br></td></tr>" +
                "<tr><td colspan=2>&nbsp;</td></tr></tr>";
        }
        cCount++;
    }
    cHtml+="</table>"
    moreComments+="</table>"
    var litems =[];
    litems.push({
        xtype: 'textarea',
        labelAlign: 'left',
        labelStyle: l_labelStyle,
        style: l_Style,
        fieldLabel: lCaption,
        readOnly: rOnly,
        //name: "field_"+inField.formCell,
        value: "",
        allowBlank:true,
        width:lWidth,
        hideLabel:false,
        id: inFormKey+'mwfControl_'+inField.formCell.replace(",","_"),
        listeners: {
            change: function(){
                controlChanged(inFormKey+'mwfControl_'+inField.formCell);
            }
        }});
    litems.push({
        html: cHtml,
        frame: false,
        bodyStyle: l_panelStyle,
        border: false,
        xtype: "panel"});
    litems.push({
        title: "more comments...",
        html: moreComments,
        frame: false,
        collapsible: true,
        bodyStyle: l_panelStyle,
        collapsed: true,
        border: false,
        xtype: "panel"});
    var simple = new Ext.FormPanel({
        labelAlign: 'left',
        hidden: hideField,
        border:false,
        defaultType: 'textarea',
        bodyStyle: l_panelStyle,
        items: litems
    });
    inField.dataSource = origDatasource;
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);
    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'mwfControl_'+inField.formCell, inField, item, simple, inContainer);
    thisControl.mappedSectionName =  mappedField;
    controlSet[thisControl.id]=thisControl;
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);

}
,
renderItemList:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var curIndex = 0;

    var lCaption = inField.caption;

    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }

    var hideField = ijfUtils.renderIfShowField("",inField);

    var collapsible = true;
    if (inField.style.indexOf('collapsible:false')>-1)
    {
        collapsible=false;
    }
    var collapsed = false;
    if (inField.style.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }


	    var l_labelStyle = inField.labelStyle;
	    var l_panelStyle = inField.panelStyle;
	    var l_Style = inField.style;
	    var l_fieldStyle = inField.fieldStyle;


	    if(!l_labelStyle) l_labelStyle="background:transparent";
	    if(!l_panelStyle) l_panelStyle="background:transparent";
	    if(!l_Style) l_Style="background:transparent";
	    if(!l_fieldStyle) l_fieldStyle="background:transparent";

	var l_Height = 'auto';
    var l_Height=ijfUtils.getNameValueFromStyleString(l_panelStyle,"height");
    if(l_Height=="")
    {
		l_Height='auto';
	}
	else
	{
    	l_Height = l_Height.replace("px","")/1;
	}

   //item list may be query, related or child
   	   var colMeta = [];
   	   colMeta["key"]={"id":"key","name":"key","schema":{}};
   	   var dataItems =[];
   if(inField.dataSource=="related")
   {
	    var translateFields = inField.dataReference;
   		 dataItems = item.fields.issuelinks.map(function(ri){
				var i = {};
				if(ri.outwardIssue) i = ri.outwardIssue;
				if(ri.inwardIssue) i = ri.inwardIssue;
	   			var retObj ={};
	   			inField.dataReference.split(",").forEach(function(f){
	   				var thisField = f.trim();
	   				var dVal = "unknown";
	   				var jField = ijfUtils.getJiraFieldById(thisField);
	   				if(i.fields.hasOwnProperty(jField.id))
	   				{
	   					dVal = ijfUtils.handleJiraFieldType(jField,i.fields[jField.id],true);
	   					//perhaps build the types here...
	   					colMeta[jField.id]=jField;
	   				}
	   				retObj[thisField]= dVal;
	   			});
	   			//retObj.iid=i.id;
	   			retObj.iid=i.key;
	   			return retObj;
		});
		dataItems = dataItems.sort(function(a, b)
		{
			var tv1 = a.iid.split("-")[1]/1;
		    var tv2  = b.iid.split("-")[1]/1;
		    return tv1>tv2 ? -1 : tv1<tv2 ? 1 : 0;
		});
   }
   else if(inField.dataSource=="children")
   {
	   var translateFields = inField.dataReference;
	   	   		 dataItems = item.fields.subtasks.map(function(i){
	   	   			var retObj ={};
	   	   			inField.dataReference.split(",").forEach(function(f){
	   	   				var thisField = f.trim();
	   	   				var dVal = "unknown";
	   	   				var jField = ijfUtils.getJiraFieldById(thisField);
	   	   				if(i.fields.hasOwnProperty(jField.id))
	   	   				{
	   	   					dVal = ijfUtils.handleJiraFieldType(jField,i.fields[jField.id],true);
	   	   					//perhaps build the types here...
	   	   					colMeta[jField.id]=jField;
	   	   				}
	   	   				retObj[thisField]= dVal;
	   	   			});
	   	   			//retObj.iid=i.id;
	   	   			retObj.iid=i.key;
	   	   			return retObj;
		});
		dataItems = dataItems.sort(function(a, b)
		{
			var tv1 = a.iid.split("-")[1]/1;
		    var tv2  = b.iid.split("-")[1]/1;
		    return tv1>tv2 ? -1 : tv1<tv2 ? 1 : 0;
		});
   }
   else
   {
	    var translateFields = ijfUtils.translateJiraFieldsToIds(inField.dataReference);
		var tSearch = "jql="+inField.dataSource+"&fields="+translateFields;

		var rawList = ijfUtils.jiraApiSync('GET','/rest/api/2/search?'+tSearch, null);
		//bail if dataItems not

		var dataItems = rawList.issues.map(function(i){
			var retObj ={};
			translateFields.split(",").forEach(function(f){
				var thisField = f.trim();
				var dVal = "unknown";
				var jField = ijfUtils.getJiraFieldById(thisField);
				if(i.fields.hasOwnProperty(jField.id))
				{
					dVal = ijfUtils.handleJiraFieldType(jField,i.fields[jField.id],true);
					//perhaps build the types here...
					colMeta[jField.id]=jField;
				}
				retObj[thisField]= dVal;
			});
			//retObj.iid=i.id;
			retObj.iid=i.key;
			return retObj;
		});
    }
    if(inField.referenceFilter)
    {
        //filter the peerItems...
        if(ijf.snippets.hasOwnPropery(inField.referenceFilter))
	        dataItems = window[iFilters.snippet](dataItems);
    }

	//calculate column widths...and headers
	var colWidths=[];
	var colNames = translateFields.split(","); //inField.dataReference.split(",");
	var colHeaders = [];
	if(inField.tableWidths) colWidths=inField.tableWidths.split(",");
	var colHeaders = [];
	if(inField.tableHeaders) colHeaders=inField.tableHeaders.split(",");
	for (var i = 0; i<colNames.length;i++)
	{
		if(colWidths[i]>0)
		{
			try{
			if(colMeta[colNames[i]]) colMeta[colNames[i]].width=colWidths[i]/1;}catch(e){}
		}
		else
		{
			if(colMeta[colNames[i]]) colMeta[colNames[i]].width=100;
		}

		if(colHeaders[i])
		{
			if(colMeta[colNames[i]]) colMeta[colNames[i]].header=colHeaders[i];
		}
		else
		{
			if(colMeta[colNames[i]]) colMeta[colNames[i]].header=colMeta[colNames[i]].name;
		}
	}


    var colSettingsArray = [];
    var gridFieldArray=[];
    //colSettingsArray.push(new Ext.grid.RowNumberer());
    //push iid as special first field...

    //look for key, hide if not there...
	var hideKey=true;
    if(inField.dataReference.indexOf("key")>-1) hideKey=false;

    gridFieldArray.push({name: "iid", type: "string"});
    colSettingsArray.push({
        header: colMeta["key"].header,
        dataIndex: "iid",
        hidden: hideKey,
        style: l_labelStyle,
        width: colMeta["key"].width,
        sortable: true
    });
	delete colMeta["key"];

    Object.keys(colMeta).forEach(function(k){
		var f = colMeta[k];
		if(f.schema.type=="date")
		{
			gridFieldArray.push({name: f.id, type: "date"});
			colSettingsArray.push({
				header: f.header,
				dataIndex: f.id,
				xtype: 'datecolumn',
				sortable: true,
				width: f.width,
				style: l_labelStyle,
				format: 'm/d/y',
				filter: {
				  type: 'date'
	            }
			});
		}
		else
		{
			gridFieldArray.push({name: f.id, type: "string"});
			colSettingsArray.push({
				header: f.header,
				width: 'auto',
				dataIndex: f.id,
				width: f.width,
				style: l_labelStyle,
				sortable: true,
				filter: {
				  type: 'string'
	            }
			});
        }
	});

    //preap and apply actions.
    var actions=null;
    var aWidth = 10;
    try
    {
        actions = JSON.parse(inField.dataReference2);
    }
    catch(e){}
    if(actions)
    {
        var actionItems = [];
        for(var a in actions)
        {
            if(actions.hasOwnProperty(a))
            {
              switch(actions[a].action)
              {
                  case "popForm":
                      actionItems.push({icon   : actions[a].icon,
                              action: actions[a],
                              handler: function(grid, rowIndex, colIndex, itm) {
                              var rec = grid.getStore().getAt(rowIndex);
                              var thisId =rec.data.iid;
                              //var tItem = mwf_loadChildItemSynchronous(thisId);
                              //itm.action.inField = inField;
                              //renderPopupForm(inFormKey,tItem,itm.action)
                            }
                          });
                      break;
                  case "runSnippet":
                      actionItems.push({icon   : actions[a].icon,
                          action: actions[a],
                          handler: function(grid, rowIndex, colIndex, itm) {
                              try
                              {
                                  ijf.snippets[itm.action.snippet](grid, rowIndex, colIndex, itm);
                              }
                              catch(e)
                              {
                                  footLog("Failed snippet action: " + itm.action.snippet);
                              }
                          }
                      });
                      break;
                  case "openForm":
                      actionItems.push({icon   : actions[a].icon,
                          action: actions[a],
                          handler: function(grid, rowIndex, colIndex,itm) {

                              var rec = grid.getStore().getAt(rowIndex);
                              var thisId =rec.data.iid;
                              if(thisId==0)
                              {
                                  ijfUtils.modalDialogMessage("Error Message", "Unable to find Item id");
                              }
                              else
                              {
                                  if(window.onbeforeunload==null)
                                  {
										ijf.currentItem=null;
										ijf.main.itemId = thisId;
										window.g_formId=itm.action.form;;
										ijf.main.processSetup("ijfContent");
                                  }
                                  else
                                  {
                                      var dFunc = function(){
                                          window.onbeforeunload= null;
											ijf.currentItem=null;
											window.g_itemId= thisId;
											window.g_formId=itm.action.form;;
											ijf.main.processSetup("ijfContent");
                                      };
                                      ijfUtils.modalDialog("Warning",ijf.main.gNavigateOnChange,dFunc);
                                  }
                              }
                          }
                      });
                      break;
                  default:
                      ijfUtils.footLog("No action: " + actions[a].action);
              }
              aWidth = aWidth + 30;
            }
        }
        if(actionItems.length>0)
        {
			colSettingsArray.push({
				header: 'Actions',
				xtype: 'actioncolumn',
				width: aWidth,
				items: actionItems
			});
		}
    }
    if(!Ext.ClassManager.isCreated(inField.dataSource + inField.formCell.replace(",","")))
    {
        Ext.define(inField.dataSource + inField.formCell.replace(",",""), {
            extend: 'Ext.data.Model',
            fields: gridFieldArray
        });
    }
    var store = Ext.create('Ext.data.Store', {
        model: inField.dataSource + inField.formCell.replace(",",""),
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }},
        autoLoad: false});
    store.proxy.data=dataItems;
    store.load();
    var l_tbar=[];
    var lXtype="";
    var grid= new Ext.grid.GridPanel({
        store: store,
        plugins: 'gridfilters',
        style: l_panelStyle,
        height: l_Height,
        width: "100%",
        ijfForm: inField,
        columns: colSettingsArray,
        selModel: {selType: 'rowmodel', mode: 'SINGLE'},
        listeners: {
            'selectionchange':  function(selMod, record, something ){
				//if event,
					//see if name = form, if so, set the item to this selectoin and render form
					//look for event by name, then run if there...
                ijf.main.gItemSectionGridIndex = record[0].data.iid;
				var tEvent = this.ijfForm.event;
				if(ijf.fw.forms.hasOwnProperty(tEvent))
				{
					ijf.currentItem=null;
                    ijf.main.itemId= record[0].data.iid;
                    window.g_formId=tEvent;
                    ijf.main.processSetup("ijfContent");
					return;
				}
				//look for snippet...
				if(ijf.snippets.hasOwnProperty(tEvent))
				{


					ijf.snippets[tEvent](record[0].data.iid,this);
					return;
				}
            },
			'beforeitemdblclick': function(selMod, record, something ){
                ijf.main.gItemSectionGridIndex = record.data.iid;
				var tEvent = this.ijfForm.tableDblClick;
				if(ijf.fw.forms.hasOwnProperty(tEvent))
				{
					ijf.currentItem=null;
                    ijf.main.itemId= record.data.iid;
                    window.g_formId=tEvent;
                    ijf.main.processSetup("ijfContent");
					return;
				}
				//look for snippet...
				if(ijf.snippets.hasOwnProperty(tEvent))
				{
					ijf.snippets[tEvent](record.data.iid,this);
					return;
				}
				//look for popform: xxx and pop the form
				tEvent=tEvent.replace("popform:","");
				if(ijf.fw.forms.hasOwnProperty(tEvent))
				{
 				    var action = {};
					action.form = tEvent;
					action.type = "open item";
					action.itemId = record.data.iid;
					action.inField = inField;
                    ijf.extUtils.renderPopupForm(inFormKey, item, action)
					return;
				}
			}
		}
    });
    var layout = new Ext.Panel({
        title: lCaption,
        collapsible: false,
        collapsed: false,
        hidden: hideField,
        width: "100%",
        layoutConfig: {
            columns: 1
        },
        style: l_Style,
        items: [grid]
    });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](layout, inFormKey,item, inField, inContainer);

    layout.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, layout, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](layout, inFormKey,item, inField, inContainer);
}

}
