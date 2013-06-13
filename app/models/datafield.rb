class Datafield
  include Mongoid::Document
  field :name, type: String
  field :fieldType, type: String

  # WORK-AROUND FOR RADIO BUTTONS
  # Use NAME to encode the options of the radio buttons.
  # Ex. NAME => YES@NO@MAYBE (Use any reserved character you want to divide the options)
  # Use FIELDTYPE to establish the field is a radio button. 
  # Ex. FIELDTYPE => RADIO

  validates_presence_of :name, :fieldType

  # A form owns these fields
  embedded_in :form

end
