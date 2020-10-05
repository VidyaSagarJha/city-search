import React from 'react';
import '../src/AutoCompleteText.js'

export default class AutoCompleteText extends React.Component {
    constructor(props){
        super(props);
        this.items = [
            'Lucknow','Kanpur','Ghaziabad','Agra','Allahabad','Ambedkar Nagar','Meerut','Varanasi', 
            'Prayagraj','Bareilly',	'Aligarh', 'Moradabad', 'Saharanpur' ,'Gorakhpur', 'Faizabad',
            'Firozabad','Jhansi','Muzaffarnagar','Mathura-Vrindavan','Rampur','Shahjahanpur',
            'Maunath Bhanjan','Noida','Ujhani','Ghazipur','Sultanpur',

        

        ];

        this.state = {
            suggestions : [],
            text: '',
        };
    }

    onTextChanged = (e) => {
        const value = e.target.value;
        console.log(value);
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }
        this.setState( () => ({ suggestions, text: value }));

    }

    suggestionSelected (value) {
        this.setState(() => ({
            text:value,
            suggestions: [],
        }))
    }

    renderSuggestions () {
        const { suggestions } = this.state;
        if(suggestions.length === 0) {
            return null;

        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        )
    }
    
    render () {
        const { text } = this.state;
        return (
            
            <div className="AutoCompleteText" >
                
                
                <input value={text} onChange={this.onTextChanged} type="text"  />
                <ul>
                    {this.renderSuggestions()}
                </ul>
            </div>
            
        );
    }
}

