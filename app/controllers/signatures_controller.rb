class SignaturesController < ApplicationController
  # GET /signatures
  # GET /signatures.json
  def index
    @signatures = Signature.all
    
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @signatures }
    end
  end

  # GET /signatures/1
  # GET /signatures/1.json
  def show
    @signature = Signature.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @signature, :callback => params[:callback] }
    end
  end

  # GET /signatures/new
  # GET /signatures/new.json
  def new
    @signature = Signature.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @signature }
    end
  end

  # GET /signatures/1/edit
  def edit
    @signature = Signature.find(params[:id])
  end

  # POST /signatures
  # POST /signatures.json
  def create
    @signature = Signature.new(params[:signature])

    signatureID = params[:signatureid]
    signature = params[:output]
    canvasHeight = params[:canvasHeight]
    canvasWidth = params[:canvasWidth]

    # Update invoice with signature
    @invoice = Invoice.find(signatureID)
    Invoice.find(signatureID).set(:signature, signature)
    Invoice.find(signatureID).set(:signatureStatus, true)
    Invoice.find(signatureID).set(:canvasHeight, canvasHeight)
    Invoice.find(signatureID).set(:canvasWidth, canvasWidth)

    creatorName = @invoice.creatorName.gsub(' ','%20')
    signeeName = @invoice.signeeName.gsub(' ','%20') 

    #Set email content. 
    subject = "Solicitud%20de%20Contrato"
    footer = "%0D%0DGracias,%0D%0D%5F%5F%0D%0D#{signeeName}"
    message = "El%20siguiente%20documento%20ha%20sido%20aprobado.%0D%0Dhttp://digidocgov.herokuapp.com/invoices/#{@invoice.id}.json#{footer}"
    email = "https://sendgrid.com/api/mail.send.json?api_user=rgonzalez&api_key=123456&to=#{@invoice['creatorEmail']}&toname=#{creatorName}&subject=#{subject}&text=#{message}&from=#{@invoice['signeeEmail']}&fromname=#{signeeName}"


    #Send email notifying approval (with Sendgrid)
    HTTParty.get(email)
    
    respond_to do |format|
      if @signature.save
        format.html { redirect_to @signature, notice: 'Signature was successfully created.' }
        format.json { render json: @signature, status: :created, location: @signature, :callback => params[:callback] }
      else
        format.html { render action: "new" }
        format.json { render json: @signature.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /signatures/1
  # PUT /signatures/1.json
  def update
    @signature = Signature.find(params[:id])

    respond_to do |format|
      if @signature.update_attributes(params[:signature])
        format.html { redirect_to @signature, notice: 'Signature was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @signature.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /signatures/1
  # DELETE /signatures/1.json
  def destroy
    @signature = Signature.find(params[:id])
    @signature.destroy

    respond_to do |format|
      format.html { redirect_to signatures_url }
      format.json { head :no_content }
    end
  end
end
