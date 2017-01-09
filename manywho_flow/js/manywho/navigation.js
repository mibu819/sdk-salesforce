/*!
Copyright 2015 ManyWho, Inc.
Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
file except in compliance with the License.
You may obtain a copy of the License at: http://manywho.com/sharedsource
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied. See the License for the specific language governing
permissions and limitations under the License.
*/
/// <reference path="../../typings/index.d.ts" />
(function (manywho) {
    var navigation = React.createClass({
        getItem: function (items, id) {
            for (var itemId in items) {
                if (itemId === id)
                    return items[id];
                else {
                    var item = items[itemId];
                    if (item.items) {
                        var foundItem = this.getItem(item.items, id);
                        if (foundItem)
                            return foundItem;
                    }
                }
            }
        },
        getHeaderElement: function (id, navigation) {
            var children = [
                React.createElement("button", {className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": '#' + id, ref: "toggle"}, React.createElement("span", {className: "sr-only"}, "Toggle Navigation"), React.createElement("span", {className: "icon-bar"}), React.createElement("span", {className: "icon-bar"}), React.createElement("span", {className: "icon-bar"}))
            ];
            if (navigation.label != null && navigation.label.trim().length > 0)
                children.push(React.createElement("a", {className: "navbar-brand", href: "#"}, navigation.label));
            return React.createElement("div", {className: "navbar-header"}, children);
        },
        getNavElements: function (items, isTopLevel) {
            var elements = [];
            for (var itemId in items) {
                var item = items[itemId];
                var element = null;
                var classNames = [
                    (item.isCurrent) ? 'active' : '',
                    (item.isVisible == false) ? 'hidden' : '',
                    (item.isEnabled) ? '' : 'disabled',
                    (isTopLevel) ? 'top-nav-element' : ''
                ];
                if (item.items != null) {
                    classNames.push('dropdown');
                    element = React.createElement("li", {className: classNames.join(' ')}, React.createElement("a", {href: "#", id: item.id, "data-toggle": "dropdown"}, item.label, React.createElement("span", {className: "caret"})), React.createElement("ul", {className: "dropdown-menu"}, this.getNavElements(item.items, false)));
                }
                else
                    element = React.createElement("li", {className: classNames.join(' ')}, React.createElement("a", {href: "#", onClick: this.onClick.bind(null, item), id: item.id}, item.label));
                elements.push(element);
            }
            return elements;
        },
        onClick: function (item) {
            if (!item.isEnabled)
                return false;
            if (this.refs.toggle && !manywho.utils.isEqual(window.getComputedStyle(this.refs.toggle).display, 'none', true))
                this.refs.toggle.click();
            manywho.engine.navigate(this.props.id, item.id, null, this.props.flowKey);
        },
        render: function () {
            var _this = this;
            var navigation = manywho.model.getNavigation(this.props.id, this.props.flowKey);
            if (navigation && navigation.isVisible) {
                manywho.log.info("Rendering Navigation");
                var navElements = this.getNavElements(navigation.items, true);
                navElements = navElements.concat(manywho.settings.global('navigation.components') || []);
                navElements = navElements.concat(manywho.settings.flow('navigation.components', this.props.flowKey) || []);
                var returnToParent = navigation.returnToParent || null;
                if (!manywho.settings.global('navigation.isWizard', this.props.flowKey, true)) {
                    var innerClassName = '';
                    if (!this.props.isFullWidth)
                        innerClassName += ' container';
                    return (React.createElement("nav", {className: "navbar navbar-default", ref: "navigationBar"}, React.createElement("div", {className: innerClassName}, this.getHeaderElement(this.props.id, navigation), React.createElement("div", {className: "collapse navbar-collapse", id: this.props.id, ref: "container"}, React.createElement("ul", {className: "nav navbar-nav"}, navElements), returnToParent))));
                }
                else {
                    return React.createElement("div", {className: "navbar-chevrons"}, (!manywho.utils.isNullOrWhitespace(navigation.label) ? React.createElement("span", {className: "navbar-brand"}, navigation.label) : null), React.createElement("ul", {className: "chevrons"}, manywho.utils.convertToArray(navigation.items)
                        .filter(function (item) { return item.isVisible; })
                        .map(function (item) {
                        var className = null;
                        if (item.isCurrent)
                            className += ' active';
                        if (item.isEnabled === false)
                            className += ' disabled';
                        if (item.tags) {
                            var tag = item.tags.find(function (tag) { return manywho.utils.isEqual(tag.developerName, 'isComplete', true); });
                            if (tag && manywho.utils.isEqual(tag.contentValue, 'false', true))
                                className += ' active';
                        }
                        return React.createElement("li", {onClick: _this.onClick.bind(null, item), id: item.id, className: className}, React.createElement("a", {href: "#"}, item.label));
                    })), returnToParent);
                }
            }
            return null;
        }
    });
    manywho.component.register("navigation", navigation);
}(manywho));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbmF2aWdhdGlvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztFQVNFO0FBRUYsaURBQWlEO0FBSWpELENBQUMsVUFBVSxPQUFPO0lBRWQsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUUvQixPQUFPLFlBQUMsS0FBVSxFQUFFLEVBQVU7WUFDMUIsR0FBRyxDQUFDLENBQUMsSUFBTSxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDekIsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQztvQkFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsQ0FBQztvQkFDRixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNiLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDN0MsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDOzRCQUNWLE1BQU0sQ0FBQyxTQUFTLENBQUM7b0JBQ3pCLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsZ0JBQWdCLEVBQUUsVUFBUyxFQUFFLEVBQUUsVUFBVTtZQUNyQyxJQUFJLFFBQVEsR0FBRztnQkFDWCxxQkFBQyxNQUFNLElBQUMsU0FBUyxFQUFDLHlCQUF5QixHQUFDLFdBQVcsR0FBQyxVQUFVLEdBQUMsV0FBVyxHQUFFLEdBQUcsR0FBRyxFQUFHLEVBQUMsR0FBRyxFQUFDLFFBQVEsR0FDbEcscUJBQUMsSUFBSSxJQUFDLFNBQVMsRUFBQyxTQUFTLHVCQUF5QixFQUNsRCxxQkFBQyxJQUFJLElBQUMsU0FBUyxFQUFDLFVBQVUsRUFBRyxFQUM3QixxQkFBQyxJ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LGNBQWUsQ0FDZCxDQUFBO2dCQUNWLENBQUM7WUFDTCxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO0tBRUosQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBRXpELENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvbmF2aWdhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuQ29weXJpZ2h0IDIwMTUgTWFueVdobywgSW5jLlxuTGljZW5zZWQgdW5kZXIgdGhlIE1hbnlXaG8gTGljZW5zZSwgVmVyc2lvbiAxLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG5maWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6IGh0dHA6Ly9tYW55d2hvLmNvbS9zaGFyZWRzb3VyY2VcblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXJcbnRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXG5LSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmdcbnBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL2luZGV4LmQudHNcIiAvPlxuXG5kZWNsYXJlIHZhciBtYW55d2hvOiBhbnk7XG5cbihmdW5jdGlvbiAobWFueXdobykge1xuXG4gICAgdmFyIG5hdmlnYXRpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgICAgICAgZ2V0SXRlbShpdGVtczogYW55LCBpZDogc3RyaW5nKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW1JZCBpbiBpdGVtcykge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtSWQgPT09IGlkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXNbaWRdO1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gaXRlbXNbaXRlbUlkXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3VuZEl0ZW0gPSB0aGlzLmdldEl0ZW0oaXRlbS5pdGVtcywgaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kSXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm91bmRJdGVtO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGdldEhlYWRlckVsZW1lbnQ6IGZ1bmN0aW9uKGlkLCBuYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBbXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJuYXZiYXItdG9nZ2xlIGNvbGxhcHNlZFwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD17JyMnICsgaWR9IHJlZj1cInRvZ2dsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzci1vbmx5XCI+VG9nZ2xlIE5hdmlnYXRpb248L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb24tYmFyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvbi1iYXJcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uLWJhclwiIC8+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBpZiAobmF2aWdhdGlvbi5sYWJlbCAhPSBudWxsICYmIG5hdmlnYXRpb24ubGFiZWwudHJpbSgpLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCg8YSBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiI1wiPntuYXZpZ2F0aW9uLmxhYmVsfTwvYT4pO1xuXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItaGVhZGVyXCI+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgICB9LFxuXG4gICAgICAgIGdldE5hdkVsZW1lbnRzOiBmdW5jdGlvbihpdGVtcywgaXNUb3BMZXZlbCkge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gW107XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbUlkIGluIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBpdGVtc1tpdGVtSWRdO1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHZhciBjbGFzc05hbWVzID0gW1xuICAgICAgICAgICAgICAgICAgICAoaXRlbS5pc0N1cnJlbnQpID8gJ2FjdGl2ZScgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgKGl0ZW0uaXNWaXNpYmxlID09IGZhbHNlKSA/ICdoaWRkZW4nIDogJycsXG4gICAgICAgICAgICAgICAgICAgIChpdGVtLmlzRW5hYmxlZCkgPyAnJyA6ICdkaXNhYmxlZCcsXG4gICAgICAgICAgICAgICAgICAgIChpc1RvcExldmVsKSA/ICd0b3AtbmF2LWVsZW1lbnQnOiAnJ1xuICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLml0ZW1zICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcy5wdXNoKCdkcm9wZG93bicpO1xuXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSA8bGkgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmpvaW4oJyAnKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGlkPXtpdGVtLmlkfSBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0ubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2FyZXRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXROYXZFbGVtZW50cyhpdGVtLml0ZW1zLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSA8bGkgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmpvaW4oJyAnKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIG9uQ2xpY2s9e3RoaXMub25DbGljay5iaW5kKG51bGwsIGl0ZW0pfSBpZD17aXRlbS5pZH0+e2l0ZW0ubGFiZWx9PC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuXG4gICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmICghaXRlbS5pc0VuYWJsZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5yZWZzLnRvZ2dsZSAmJiAhbWFueXdoby51dGlscy5pc0VxdWFsKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMucmVmcy50b2dnbGUpLmRpc3BsYXksICdub25lJywgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzLnRvZ2dsZS5jbGljaygpO1xuXG4gICAgICAgICAgICBtYW55d2hvLmVuZ2luZS5uYXZpZ2F0ZSh0aGlzLnByb3BzLmlkLCBpdGVtLmlkLCBudWxsLCB0aGlzLnByb3BzLmZsb3dLZXkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5hdmlnYXRpb24gPSBtYW55d2hvLm1vZGVsLmdldE5hdmlnYXRpb24odGhpcy5wcm9wcy5pZCwgdGhpcy5wcm9wcy5mbG93S2V5KTtcblxuICAgICAgICAgICAgaWYgKG5hdmlnYXRpb24gJiYgbmF2aWdhdGlvbi5pc1Zpc2libGUpIHtcblxuICAgICAgICAgICAgICAgIG1hbnl3aG8ubG9nLmluZm8oXCJSZW5kZXJpbmcgTmF2aWdhdGlvblwiKTtcblxuICAgICAgICAgICAgICAgIGxldCBuYXZFbGVtZW50cyA9IHRoaXMuZ2V0TmF2RWxlbWVudHMobmF2aWdhdGlvbi5pdGVtcywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBuYXZFbGVtZW50cyA9IG5hdkVsZW1lbnRzLmNvbmNhdChtYW55d2hvLnNldHRpbmdzLmdsb2JhbCgnbmF2aWdhdGlvbi5jb21wb25lbnRzJykgfHwgW10pO1xuICAgICAgICAgICAgICAgIG5hdkVsZW1lbnRzID0gbmF2RWxlbWVudHMuY29uY2F0KG1hbnl3aG8uc2V0dGluZ3MuZmxvdygnbmF2aWdhdGlvbi5jb21wb25lbnRzJywgdGhpcy5wcm9wcy5mbG93S2V5KSB8fCBbXSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXR1cm5Ub1BhcmVudCA9IG5hdmlnYXRpb24ucmV0dXJuVG9QYXJlbnQgfHwgbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmICghbWFueXdoby5zZXR0aW5ncy5nbG9iYWwoJ25hdmlnYXRpb24uaXNXaXphcmQnLCB0aGlzLnByb3BzLmZsb3dLZXksIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbm5lckNsYXNzTmFtZSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5wcm9wcy5pc0Z1bGxXaWR0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyQ2xhc3NOYW1lICs9ICcgY29udGFpbmVyJ1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoPG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWRlZmF1bHRcIiByZWY9XCJuYXZpZ2F0aW9uQmFyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17aW5uZXJDbGFzc05hbWV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLmdldEhlYWRlckVsZW1lbnQodGhpcy5wcm9wcy5pZCwgbmF2aWdhdGlvbil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xsYXBzZSBuYXZiYXItY29sbGFwc2VcIiBpZD17dGhpcy5wcm9wcy5pZH0gcmVmPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2YmFyLW5hdlwiPntuYXZFbGVtZW50c308L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmV0dXJuVG9QYXJlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9uYXY+KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1jaGV2cm9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyghbWFueXdoby51dGlscy5pc051bGxPcldoaXRlc3BhY2UobmF2aWdhdGlvbi5sYWJlbCkgPyA8c3BhbiBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIj57bmF2aWdhdGlvbi5sYWJlbH08L3NwYW4+IDogbnVsbCApfVxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImNoZXZyb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge21hbnl3aG8udXRpbHMuY29udmVydFRvQXJyYXkobmF2aWdhdGlvbi5pdGVtcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+IGl0ZW0uaXNWaXNpYmxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlzQ3VycmVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pc0VuYWJsZWQgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnIGRpc2FibGVkJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udGFncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZyA9IGl0ZW0udGFncy5maW5kKHRhZyA9PiBtYW55d2hvLnV0aWxzLmlzRXF1YWwodGFnLmRldmVsb3Blck5hbWUsICdpc0NvbXBsZXRlJywgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YWcgJiYgbWFueXdoby51dGlscy5pc0VxdWFsKHRhZy5jb250ZW50VmFsdWUsICdmYWxzZScsIHRydWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpIG9uQ2xpY2s9e3RoaXMub25DbGljay5iaW5kKG51bGwsIGl0ZW0pfSBpZD17aXRlbS5pZH0gY2xhc3NOYW1lPXtjbGFzc05hbWV9PjxhIGhyZWY9XCIjXCI+e2l0ZW0ubGFiZWx9PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAge3JldHVyblRvUGFyZW50fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBtYW55d2hvLmNvbXBvbmVudC5yZWdpc3RlcihcIm5hdmlnYXRpb25cIiwgbmF2aWdhdGlvbik7XG5cbn0obWFueXdobykpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9