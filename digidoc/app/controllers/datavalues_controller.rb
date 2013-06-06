class DatavaluesController < ApplicationController
  # GET /datavalues
  # GET /datavalues.json
  def index
    @datavalues = Datavalue.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @datavalues }
    end
  end

  # GET /datavalues/1
  # GET /datavalues/1.json
  def show
    @datavalue = Datavalue.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @datavalue }
    end
  end

  # GET /datavalues/new
  # GET /datavalues/new.json
  def new
    @datavalue = Datavalue.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @datavalue }
    end
  end

  # GET /datavalues/1/edit
  def edit
    @datavalue = Datavalue.find(params[:id])
  end

  # POST /datavalues
  # POST /datavalues.json
  def create
    @datavalue = Datavalue.new(params[:datavalue])

    respond_to do |format|
      if @datavalue.save
        format.html { redirect_to @datavalue, notice: 'Datavalue was successfully created.' }
        format.json { render json: @datavalue, status: :created, location: @datavalue }
      else
        format.html { render action: "new" }
        format.json { render json: @datavalue.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /datavalues/1
  # PUT /datavalues/1.json
  def update
    @datavalue = Datavalue.find(params[:id])

    respond_to do |format|
      if @datavalue.update_attributes(params[:datavalue])
        format.html { redirect_to @datavalue, notice: 'Datavalue was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @datavalue.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /datavalues/1
  # DELETE /datavalues/1.json
  def destroy
    @datavalue = Datavalue.find(params[:id])
    @datavalue.destroy

    respond_to do |format|
      format.html { redirect_to datavalues_url }
      format.json { head :no_content }
    end
  end
end
