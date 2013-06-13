class Datavalue
  include Mongoid::Document
  field :name, type: String
  field :value, type: String
  field :fieldType, type: String

  # WORK-AROUND FOR RADIO BUTTONS
  # Use NAME to encode the options of the radio buttons.
  # Ex. NAME => YES@NO@MAYBE (Use any reserved character you want to divide the options)
  # Use VALUE to represent the selection. 
  # Ex. VALUE => NO (Or any kind of data you find useful to represent the option, you could use numbers). 
  # Use FIELDTYPE to establish the field is a radio button. 
  # Ex. FIELDTYPE => RADIO

  # An Invoice owns these fields
  embedded_in :invoice
end
