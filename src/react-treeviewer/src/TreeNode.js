import React, { Component, PropTypes } from 'react'
import _ from 'lodash';
// import FontAwesome from 'react-fontawesome';
import TreeNodeAnchor from './TreeNodeAnchor';
import Collapse from 'react-collapse';
import {
    passDownProps
} from './utilities';

class TreeNode extends Component {
    getNodeSelector(child) {
        let {
            data,
            handleDoubleClick
            } = this.props;
        return (
            <TreeNodeAnchor
               data-id={data.id}
               onClick={this.onSelect.bind(this)}
               onDoubleClick={handleDoubleClick}
               className="branch-toggle selector"
               selected={data.selected}
            >
                {child}
            </TreeNodeAnchor>
        );
    }
    getNodeExpander(child) {
        let {
            data,
            handleToggleClick,
            handleDoubleClick
            } = this.props;
        return (
            <TreeNodeAnchor
                id={data.id}
                expanded={data.expanded}
                onClick={handleToggleClick}
                onDoubleClick={handleDoubleClick}
                className="branch-toggle expander"
                onDragStart={this.onDragStart.bind(this)}
                onDrag={this.onDrag.bind(this)}
                onDragEnd={this.onDragEnd.bind(this)}
                selected={data.selected}
            >
                {child}
            </TreeNodeAnchor>
        );
    }
    getCheckbox(data) {
        return this.props.checkable ?
            <input
                data-id={data.id}
                type="checkbox"
                onChange={this.onCheck.bind(this)}
                checked={data.checked}
            /> :
            '';
    }

    onDrag(e) {
        if(this.props.onDrag) {
            this.props.onDrag(e,this.props.data);
        }
    }
    onDragEnd(e) {
        if(this.props.onDragEnd) {
            this.props.onDragEnd(e,this.props.data);
        }
    }
    onSelect(e) {
        e.preventDefault();
        if (this.props.selectable) {
            this.props.handleSelect(e);
            if (this.props.onSelect) {
                this.props.onSelect(e, this.props.data);
            }
        }
    }
    onDragStart(e) {
        if(this.props.draggable && this.props.onDragStart) {
            this.props.onDragStart(e, this.props.data);
        }
    }
    onCheck(e) {
        this.props.handleCheck(e);
        if(this.props.onCheck) {
            this.props.onCheck(e, this.props.data);
        }
    }
    getChildren() {
        let {
            data,
            animation,
            level
            } = this.props;
        let { expanded } = data;

        if(!animation && !expanded) {
            return '';
        }
        return (
            <ul className="tree-branch">
                {data.contacts.map(child => (
                    <TreeNode
                        key={_.uniqueId()}
                        level={level + 1}
                        data={child}
                        {...passDownProps(this.props)}
                        expanded={expanded}
                    />
                ))}
            </ul>
        );
    }
    render() {
        let {
            data,
            selectable,
            animation
            } = this.props;
        let {
            expanded,
            id,
            name
            } = data;
        let hasChildren = data.contacts !== undefined;
        return (
          <li>
              {hasChildren ?
                  (<div>

                      {this.getCheckbox(data)}
                      {selectable ?
                          this.getNodeSelector(name) :
                          this.getNodeExpander(name)
                      }
                  </div>) :
                  (<div>
                      {this.getCheckbox(data)}
                      {this.getNodeSelector(name)}
                  </div>)
              }
              {hasChildren && animation &&
              <Collapse isOpened={!!expanded}>
                  {this.getChildren()}
              </Collapse>
              }
              {hasChildren && !animation && this.getChildren()}
          </li>
        );
    }
}
TreeNode.defaultProps = {
    data: {
        name: '',
        expanded: false,
        selected: false,
        checked: false
    }
};
TreeNode.propTypes = {
    data: PropTypes.shape({
        selected: PropTypes.bool,
        expanded: PropTypes.bool,
        checked: PropTypes.bool,
        id: PropTypes.number,
        name: PropTypes.string,
    }),
    level: PropTypes.number,
    selectable: PropTypes.bool,
    checkable: PropTypes.bool,
    onCheck: PropTypes.func,
    draggable: PropTypes.bool,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func,
    handleToggleClick: PropTypes.func,
    handleDoubleClick: PropTypes.func,
    onSelect: PropTypes.func,
    handleCheck: PropTypes.func,
    handleSelect: PropTypes.func,
    animation: PropTypes.bool
};
export default TreeNode;
