class InvoicesController < ApplicationController
  # GET /invoices
  # GET /invoices.json  
  def index
    @invoices = Invoice.all

    # Handle invoices selection.
    if params.has_key?(:currentIndex)
      Invoice.where(:current => true).update(current: false) # Reset any selected invoice. 
      Invoice.where(:_id => params[:currentIndex]).update(current: true)
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @invoices, :callback => params[:callback] }
    end
  end

  # GET /invoices/1
  # GET /invoices/1.json
  def show
    @invoice = Invoice.find(params[:id])
    @invoices = Invoice.all

    # Update current.
    Invoice.where(:current => true).update(current: false)
    Invoice.where(:_id => @invoice.id).update(current: true)

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @invoice, :callback => params[:callback] }
    end
  end

  # GET /invoices/new
  # GET /invoices/new.json
  def new
    @invoice = Invoice.new
    @invoices = Invoice.all

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @invoice }
    end
  end

  # GET /invoices/1/edit
  def edit
    @invoice = Invoice.find(params[:id])
  end

  # POST /invoices
  # POST /invoices.json
  def create
    @invoice = Invoice.new(params[:invoice])

    respond_to do |format|
      if @invoice.save
        
        #Embedded Documents
        values = params[:datavalues]

        if values
          values.each do |f|
            @invoice.datavalues.create!(:name => f['name'], :fieldType => f['fieldType'])
          end
        end

        creatorName = @invoice.creatorName.gsub(' ','%20')
        signeeName = @invoice.signeeName.gsub(' ','%20')

        #Set email content. 
        subject = "Solicitud%20de%20Contrato"
        footer = "%0D%0DGracias,%0D%0D%5F%5F%0D%0D#{creatorName}"
        message = "El%20siguiente%20documento%20requiere%20su%20firma%20para%20aprobaci%C3%B3n.%0D%0Dhttp://tonkabeta.kytelabs.com/examples/require-drawn-signature.html?signatureid=#{@invoice.id}#{footer}"
        email = "https://sendgrid.com/api/mail.send.json?api_user=rgonzalez&api_key=123456&to=#{@invoice['signeeEmail']}&toname=#{signeeName}&subject=#{subject}&text=#{message}&from=#{@invoice['creatorEmail']}&fromname=#{creatorName}"

        #Send email to request signature (with Sendgrid)
        HTTParty.get(email)

        format.html { redirect_to @invoice, notice: 'Invoice was successfully created.' }
        format.json { render json: @invoice, status: :created, location: @invoice }
      else
        format.html { render action: "new" }
        format.json { render json: @invoice.errors, status: :unprocessable_entity, :callback => params[:callback]  }
      end
    end
  end

  # PUT /invoices/1
  # PUT /invoices/1.json
  def update
    @invoice = Invoice.find(params[:id])

    respond_to do |format|
      if @invoice.update_attributes(params[:invoice])
        format.html { redirect_to @invoice, notice: 'Invoice was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @invoice.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /invoices/1
  # DELETE /invoices/1.json
  def destroy
    @invoice = Invoice.find(params[:id])
    @invoice.destroy

    respond_to do |format|
      format.html { redirect_to invoices_url }
      format.json { head :no_content }
    end
  end
end
