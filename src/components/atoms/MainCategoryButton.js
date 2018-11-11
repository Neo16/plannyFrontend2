import * as React from 'react';

export class MainCategoryButton extends React.Component
{  
    render() {
        var c = this.props.category;
        return (
            <div key={c.id} className="category-button">
                <img className="categoryIcon" src={"/" + c.name + ".svg"} />
                <div className="categoryTitle">{c.name}</div>
            </div>
        );
    }
}