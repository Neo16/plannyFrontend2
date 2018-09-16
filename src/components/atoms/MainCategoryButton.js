import * as React from 'react';

export class MainCategoryButton extends React.Component
{  
    render() {
        var c = this.props.category;
        return (
            <li onClick={() => this.props.toggleSelectCategory(c)} key={c.id}>
                <img className="categoryIcon" src={"/" + c.name + ".svg"} />
                <div className="categoryTitle"
                    style={{ color: this.props.currentParentCategoryId == c.id ? '#3F6EC1' : 'black' }}>{c.name}</div>
            </li>
        );
    }
}