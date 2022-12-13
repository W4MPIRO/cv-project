import React from "react";
import SubSection from "./SubSection";

class Section extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            section: this.props.section,
            subSectionId: (()=>{
                let id = 0;
                this.props.savedInfo.forEach(el=>{
                    if(el.sectionName === this.props.section.section && el.data.length){
                        id = el.data[el.data.length - 1].id
                    }
                })
                return id
            })(),
        }
    }


    updateId() {
        this.setState(prevState => {
            return {subSectionId : prevState.subSectionId + 1}
        } )
    }

    render() {
        return (
            <div className={this.state.section.section + " section-container"}>
                <header>{this.state.section.section}</header>
                <div className="info-container">{this.state.section.info}</div>
                <ul className="subSection-container">
                    {this.props.savedInfo.map(section => {
                        if (section.sectionName === this.state.section.section) {
                            //Render Subsection for each element in DB data of crr section
                            return section.data.map((savedData, index) => {
                                return <SubSection key={index} removeSection={this.props.removeSection} updateSection={this.props.updateSection} savedData={savedData} subSectionId={savedData.id} sectionTemplate={this.state.section} />
                            })
                        }
                        return null
                    })}
                </ul>

                {(this.state.section.section === 'Personal Details') || (this.state.section.section === 'Professional Summary') ? <div></div> : <div className="addInput" onClick={() => {
                    this.props.addSection(this.state.section, this.state.subSectionId)
                    this.updateId()
                }}>Add {this.state.section.add} +</div>}
            </div>
        )
    }
}

export default Section