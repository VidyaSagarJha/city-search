import React from 'react';

import axios from 'axios';


class Search extends React.Component {

	constructor( props ) {
        super( props );
        
        this.items=[];
		this.state = {
            query: '',
            
			results: {},
			loading: false,
            message: '',
            
            suggestions: [],
            text: '',
			
		};

		this.cancel = '';
    }

    fetchSearchResults = (query) => {
        const searchUrl = `http://ec2-13-126-190-182.ap-south-1.compute.amazonaws.com/api/v1/places/country/1269750/region/1253626/city/?search=${query}`;
        
        if( this.cancel) {
            this.cancel.cancel();
        }

        this.cancle = axios.CancelToken.source();
        axios.get(searchUrl,  {
            cancleToken:this.cancle.token

        })
        .then(res => {
            const resultNotFoundMsg = ! res.data.results.length ? 'there are no such data' : '';
            this.setState({results:res.data.results,
            message: resultNotFoundMsg, 
            loading: false});
            
           

        })
        .catch(error => {
            if(axios.isCancel(error) || error) {
                this.setState({ loading: false, message: "failed to fetch data"})
            }
        })
}
    
    handleOnInputChange = (event) => {
        const query = event.target.value;
        this.setState( {query}, () => {
            this.fetchSearchResults(query);
            this.setItemsValue();
        } );

        const value = event.target.value;
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
                {suggestions.map((item) => <li key={item+.1} onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        )
    }

    setItemsValue = () =>{
    const { results } = this.state;
    console.log(results);
    for(var i=0; i<results.length;i++){
        this.items.push(results[i].name_std);
      }
    
}





	render() {
        const { query } = this.state;
        const { text } = this.state;
      
        

		

		return (
			<div className="AutoCompleteText">
		
			<h2 className="heading">City Search</h2>
		
			<label className="search-label" htmlFor="search-input">
				<input
					type="text"
					name="query"
					value={ text }
					id="search-input"
					placeholder="Search..."
                    onChange={this.handleOnInputChange}
                    
				/>
                <i className="fa fa-search search-icon"/>
                <ul>
                    {this.renderSuggestions()}
                </ul>
				
			</label>

		
			

			

			</div>
		)
	}
}

export default Search